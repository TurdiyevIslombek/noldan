import { useEffect, useRef, useState } from "react";
import {
  Clapperboard,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Youtube,
} from "lucide-react";

/* ====================================================================
   The two places a lesson shows video.

   MediaSlot — an animation file dropped at
       public/media/<course>/<lesson>/<id>.mp4
   plays in place, muted and looping, while it is on screen — with a
   full player: pause, restart, scrub, slow motion, fullscreen.

   VideoSlot — the lesson's YouTube walkthrough, from the
   "> **Video:** …" line in the lesson's Markdown header.

   Neither needs a code change to fill. Until a file or link exists the
   slot is invisible to students; the author sees a marked placeholder
   with the exact path to use — on the dev server, or on the live site
   with ?muallif added to the URL.
   ==================================================================== */

export const AUTHOR =
  import.meta.env.DEV ||
  (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("muallif"));

/* A missing file comes back as the site's index.html under the SPA
   fallback, so "is it there" means "is it actually a video". */
async function isVideo(url: string) {
  try {
    const r = await fetch(url, { method: "HEAD", cache: "no-store" });
    return r.ok && (r.headers.get("content-type") ?? "").startsWith("video/");
  } catch {
    return false;
  }
}

export function MediaSlot({
  course,
  lesson,
  id,
  title,
}: {
  course: string;
  lesson: string;
  id: string;
  title: string;
}) {
  const path = `/media/${course}/${lesson}/${id}.mp4`;
  const [state, setState] = useState<"probe" | "ok" | "missing">("probe");

  useEffect(() => {
    let live = true;
    isVideo(path).then((ok) => live && setState(ok ? "ok" : "missing"));
    return () => {
      live = false;
    };
  }, [path]);

  if (state === "ok") return <Player src={path} title={title} />;
  if (state === "missing" && AUTHOR) {
    return (
      <figure className="mslot">
        <span className="mslot__ico" aria-hidden="true">
          <Clapperboard size={18} strokeWidth={2} />
        </span>
        <span className="mslot__body">
          <span className="mslot__k">Animatsiya · {id.toUpperCase()}</span>
          <strong>{title}</strong>
          <span className="mslot__how">
            Faylni shu yerga qoʻying: <code>public{path}</code>
          </span>
          <span className="mslot__note">Faqat sizga koʻrinadi — talabalar bu joyni fayl qoʻyilgandan keyin koʻradi.</span>
        </span>
      </figure>
    );
  }
  return null;
}

/* Fullscreen differs by browser: the standard API on the frame (so our
   own controls come along), the webkit prefix on older Safari, and on
   iPhone — which cannot put anything but a <video> fullscreen — the
   video's own native player. */
type WebkitDoc = Document & { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void };
type WebkitEl = HTMLElement & { webkitRequestFullscreen?: () => void };
type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

const fsElement = () => document.fullscreenElement ?? (document as WebkitDoc).webkitFullscreenElement ?? null;

function enterFullscreen(frame: HTMLElement, video: HTMLVideoElement) {
  const el = frame as WebkitEl;
  if (el.requestFullscreen) el.requestFullscreen().catch(() => undefined);
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else (video as WebkitVideo).webkitEnterFullscreen?.();
}

function exitFullscreen() {
  const d = document as WebkitDoc;
  if (document.exitFullscreen) document.exitFullscreen().catch(() => undefined);
  else d.webkitExitFullscreen?.();
}

/** Only a video that really carries sound gets a sound button. */
function hasAudio(v: HTMLVideoElement): boolean {
  const x = v as HTMLVideoElement & {
    mozHasAudio?: boolean;
    webkitAudioDecodedByteCount?: number;
    audioTracks?: { length: number };
  };
  return Boolean(x.mozHasAudio || (x.webkitAudioDecodedByteCount ?? 0) > 0 || (x.audioTracks?.length ?? 0) > 0);
}

const clock = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

const RATES = [1, 0.5, 0.25];

function Player({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [rate, setRate] = useState(1);
  const [full, setFull] = useState(false);
  const [sound, setSound] = useState(false);
  const [muted, setMuted] = useState(true);
  /** The student paused it: scrolling must not start it again. */
  const heldRef = useRef(false);

  // Plays by itself only while on screen, and only until the student
  // takes over — a lesson may hold several of these.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!heldRef.current) v.play().catch(() => {});
        } else if (!fsElement()) {
          v.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // The progress bar is drawn here and only here: every frame while
  // playing (`timeupdate` alone moves it in visible jumps a few times a
  // second), and once whenever it stops or is scrubbed.
  const paintFill = () => {
    const v = ref.current;
    const f = fillRef.current;
    if (v && f) f.style.transform = `scaleX(${v.duration ? v.currentTime / v.duration : 0})`;
  };
  useEffect(() => {
    if (!playing) {
      paintFill();
      return;
    }
    let raf = 0;
    const tick = () => {
      paintFill();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, dur]);

  useEffect(() => {
    const onFs = () => setFull(fsElement() === frameRef.current);
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      heldRef.current = false;
      v.play().catch(() => {});
    } else {
      heldRef.current = true;
      v.pause();
    }
  };

  const seek = (to: number) => {
    const v = ref.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.max(0, Math.min(v.duration - 0.05, to));
    setTime(v.currentTime);
    paintFill();
  };

  const restart = () => {
    const v = ref.current;
    if (!v) return;
    seek(0);
    heldRef.current = false;
    v.play().catch(() => {});
  };

  const cycleRate = () => {
    const v = ref.current;
    if (!v) return;
    // From the video itself, not from state: two quick clicks must both count.
    const next = RATES[(RATES.indexOf(v.playbackRate) + 1) % RATES.length];
    v.playbackRate = next;
    setRate(next);
  };

  const fullscreen = () => {
    const v = ref.current;
    const f = frameRef.current;
    if (!v || !f) return;
    if (fsElement()) exitFullscreen();
    else enterFullscreen(f, v);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement && e.key.startsWith("Arrow")) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") {
      if (e.target instanceof HTMLButtonElement && k === " ") return;
      e.preventDefault();
      toggle();
    } else if (k === "f") {
      e.preventDefault();
      fullscreen();
    } else if (k === "arrowleft" || k === "arrowright") {
      e.preventDefault();
      seek((ref.current?.currentTime ?? 0) + (k === "arrowleft" ? -2 : 2));
    } else if (k === "home" || k === "0") {
      e.preventDefault();
      restart();
    }
  };

  return (
    <figure className="mplay">
      <div
        ref={frameRef}
        className={`mplay__frame${playing ? " is-playing" : ""}${full ? " is-full" : ""}`}
        tabIndex={0}
        role="group"
        aria-label={`Animatsiya: ${title}. Boʻsh joy — qoʻyish yoki toʻxtatish, F — toʻliq ekran.`}
        onKeyDown={onKey}
      >
        <video
          ref={ref}
          src={src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onPlaying={(e) => {
            const v = e.currentTarget;
            window.setTimeout(() => setSound(hasAudio(v)), 400);
          }}
          onClick={toggle}
          onDoubleClick={fullscreen}
          aria-hidden="true"
        />

        {!playing && (
          <button type="button" className="mplay__big" onClick={toggle} aria-label="Qoʻyish" tabIndex={-1}>
            <Play size={26} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}

        <div className="mplay__bar">
          <button type="button" onClick={toggle} aria-label={playing ? "Toʻxtatish" : "Qoʻyish"} title={playing ? "Toʻxtatish (K)" : "Qoʻyish (K)"}>
            {playing ? <Pause size={16} strokeWidth={2.2} /> : <Play size={16} strokeWidth={2.2} />}
          </button>
          <button type="button" onClick={restart} aria-label="Boshidan qoʻyish" title="Boshidan">
            <RotateCcw size={15} strokeWidth={2.2} />
          </button>

          <span className="mplay__time" aria-hidden="true">
            {clock(time)} / {clock(dur)}
          </span>

          <span className="mplay__track">
            <span className="mplay__rail" aria-hidden="true">
              <span className="mplay__fill" ref={fillRef} />
            </span>
            <input
              type="range"
              min={0}
              max={dur || 0}
              step={0.01}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Vaqt"
              aria-valuetext={`${clock(time)} / ${clock(dur)}`}
            />
          </span>

          <button
            type="button"
            className="mplay__rate"
            onClick={cycleRate}
            aria-label={`Tezlik: ${rate}×`}
            title="Sekinlashtirish"
          >
            {rate}×
          </button>

          {sound && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Ovozni yoqish" : "Ovozni oʻchirish"}
            >
              {muted ? <VolumeX size={16} strokeWidth={2.2} /> : <Volume2 size={16} strokeWidth={2.2} />}
            </button>
          )}

          <button
            type="button"
            onClick={fullscreen}
            aria-label={full ? "Toʻliq ekrandan chiqish" : "Toʻliq ekran"}
            title={full ? "Chiqish (F)" : "Toʻliq ekran (F)"}
          >
            {full ? <Minimize size={16} strokeWidth={2.2} /> : <Maximize size={16} strokeWidth={2.2} />}
          </button>
        </div>
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

export function VideoSlot({ video, title }: { video?: string; title: string }) {
  const [on, setOn] = useState(false);

  if (!video) {
    if (!AUTHOR) return null;
    return (
      <figure className="mslot mslot--yt">
        <span className="mslot__ico" aria-hidden="true">
          <Youtube size={18} strokeWidth={2} />
        </span>
        <span className="mslot__body">
          <span className="mslot__k">YouTube video</span>
          <strong>Bu darsning video versiyasi uchun joy</strong>
          <span className="mslot__how">
            Dars faylining boshiga shu qatorni qoʻshing:{" "}
            <code>&gt; **Video:** https://youtu.be/…</code>
          </span>
          <span className="mslot__note">Faqat sizga koʻrinadi.</span>
        </span>
      </figure>
    );
  }

  return (
    <figure className="yt">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="yt__face"
          onClick={() => setOn(true)}
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video}/hqdefault.jpg)` }}
        >
          <span className="yt__play" aria-hidden="true">
            <Play size={22} strokeWidth={2.4} />
          </span>
          <span className="yt__label">Video darsni koʻrish</span>
        </button>
      )}
    </figure>
  );
}
