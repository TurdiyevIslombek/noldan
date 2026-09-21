import { useEffect, useRef, useState } from "react";
import { Clapperboard, Pause, Play, Volume2, VolumeX, Youtube } from "lucide-react";

/* ====================================================================
   The two places a lesson shows video.

   MediaSlot — an animation file dropped at
       public/media/<course>/<lesson>/<id>.mp4
   plays in place, muted and looping, while it is on screen.

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

function Player({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Plays only while on screen: a lesson may hold several of these.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <figure className="mplay">
      <div className="mplay__frame">
        <video
          ref={ref}
          src={src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
          aria-label={title}
        />
        <div className="mplay__ctl">
          <button type="button" onClick={toggle} aria-label={playing ? "Toʻxtatish" : "Qoʻyish"}>
            {playing ? <Pause size={15} strokeWidth={2.2} /> : <Play size={15} strokeWidth={2.2} />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Ovozni yoqish" : "Ovozni oʻchirish"}
          >
            {muted ? <VolumeX size={15} strokeWidth={2.2} /> : <Volume2 size={15} strokeWidth={2.2} />}
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
