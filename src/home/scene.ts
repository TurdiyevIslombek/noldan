import * as THREE from "three";
import {
  attention,
  bytes,
  chaos,
  tokens,
  wordmark,
} from "./formations";
import { edgeRaster, pixelRaster } from "./raster";

/* ====================================================================
   The same five-destination point cloud, rendered as ink on paper.

   A light ground changes the whole technique. Additive blending and
   bloom are what make particles glow on black; on white they only wash
   the page out. So this renders dark points with normal blending and
   lets overlap accumulate into density, the way a plotter or a
   risograph builds tone. No post-processing at all, which also means
   it holds 60fps on the kind of laptop a judge is carrying.
   ==================================================================== */

const N = 4600;
const STAGES = 7;

/** Dark ink on paper. The unresolved state is the palest: structure
 *  literally darkens as the model learns it. */
const STAGE_COLOR = [
  [0.55, 0.6, 0.64],
  [0.16, 0.2, 0.24],
  [0.2, 0.26, 0.3],
  [0.7, 0.23, 0.02],
  [0.18, 0.22, 0.26],
  [0.7, 0.23, 0.02],
  [0.07, 0.09, 0.11],
] as const;

/** Normal blending converges toward the ink colour instead of clipping
 *  the way additive does, so density can run much closer to full. Only
 *  the two tightest formations need holding back at all. */
const PACKING = [1, 1, 1, 0.92, 0.96, 0.9, 0.86];

/** Glyph size per stage. The rasters are a grid with one character per
 *  cell, so they take the full size; the clouds stack many characters
 *  in the same place and need less. */
const SIZING = [0.5, 0.48, 0.52, 0.54, 0.82, 0.82, 0.56];

/** Hex digits, drawn once into a 4x4 atlas. Every particle is one
 *  character rather than a dot, because "the model sees numbers" is the
 *  claim the whole page makes and this is that claim, rendered. */
const GLYPHS =
  // 0-15: hex digits, for the stages that are literally byte values.
  "0123456789ABCDEF" +
  // 16-31: a density ramp, lightest to heaviest. The raster stages pick
  // from this by pixel value, which is how ASCII art has always worked.
  " .,:;!iltfcoak#@";

function glyphAtlas(): THREE.Texture {
  const CELL = 64;
  const cv = document.createElement("canvas");
  cv.width = CELL * 8;
  cv.height = CELL * 4;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${Math.round(CELL * 0.74)}px "Martian Mono Variable", ui-monospace, monospace`;
  GLYPHS.split("").forEach((g, i) => {
    const cx = (i % 8) * CELL + CELL / 2;
    const cy = Math.floor(i / 8) * CELL + CELL / 2;
    ctx.fillText(g, cx, cy);
  });
  const tex = new THREE.CanvasTexture(cv);
  tex.flipY = false;
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

const VERT = /* glsl */ `
  precision highp float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  // The built-in position attribute doubles as the first formation, so
  // it is not declared twice. Raw materials declare everything.
  attribute vec3 position;
  attribute vec3 p1;
  attribute vec3 p2;
  attribute vec3 p3;
  attribute vec3 p4;
  attribute vec3 p5;
  attribute vec3 p6;
  attribute vec2 seed;
  // x: the particle's fixed hex digit. y and z: its ramp index in the
  // pixel and edge rasters. Packed, because attribute slots are scarce.
  attribute vec3 packA;
  attribute vec2 cellUV;
  attribute vec3 rgbA;
  attribute vec3 rgbB;

  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uInk;
  uniform float uAssemble;
  uniform vec2 uPointer;
  uniform float uForce;
  uniform float uRipple;
  uniform float uScan;
  uniform float uDpr;
  uniform vec3 uC0, uC1, uC2, uC3, uC4, uC5, uC6;

  varying vec3 vColor;
  varying float vFade;
  varying vec2 vCell;

  float w(float i) { return max(0.0, 1.0 - abs(uMorph - i)); }

  void main() {
    float w0 = w(0.0), w1 = w(1.0), w2 = w(2.0), w3 = w(3.0);
    float w4 = w(4.0), w5 = w(5.0), w6 = w(6.0);

    // The raster stages read the picture, so their character comes from
    // the density ramp rather than from the particle's fixed hex digit.
    float g = packA.x;
    if (w4 > 0.5) g = 16.0 + packA.y;
    if (w5 > 0.5) g = 16.0 + packA.z;
    vCell = vec2(mod(g, 8.0), floor(g / 8.0));

    vec3 pos = position * w0 + p1 * w1 + p2 * w2 + p3 * w3
             + p4 * w4 + p5 * w5 + p6 * w6;

    // ---- the raster stages read like a raster ----
    float wRaster = w4 + w5;
    // Rows fill from the top as the stage arrives, the way a scanner or
    // a progressive image actually delivers a picture.
    float reveal = mix(
      1.0,
      smoothstep(cellUV.y - 0.3, cellUV.y + 0.03, wRaster),
      min(1.0, wRaster * 1.6)
    );
    // One window sweeping across, which is the whole mechanism of a
    // convolution: a small kernel visiting every position in turn.
    float sx = fract(uScan);
    float dx = abs(cellUV.x - sx);
    dx = min(dx, 1.0 - dx);
    float band = exp(-pow(dx * 20.0, 2.0)) * smoothstep(0.3, 0.75, wRaster);
    pos.z += band * 2.8;
    vColor  = uC0 * w0 + uC1 * w1 + uC2 * w2 + uC3 * w3
            + rgbA * w4 + rgbB * w5 + uC6 * w6;
    vColor = mix(vColor, vec3(0.72, 0.24, 0.02), band * 0.9);

    // Drift while travelling, settle once a formation locks in, so the
    // shapes stay legible as the diagrams they are.
    float travel = 1.0 - max(max(max(w0, w1), max(w2, w3)), max(max(w4, w5), w6));
    float amp = 0.1 + travel * 1.4;
    pos.x += sin(uTime * 0.31 + seed.x * 22.0) * amp;
    pos.y += cos(uTime * 0.26 + seed.y * 19.0) * amp;
    pos.z += sin(uTime * 0.2 + seed.x * 13.0) * amp * 0.8;

    // Assemble on first paint: the cloud arrives from outside the frame
    // and contracts into the first formation.
    pos *= mix(2.7, 1.0, uAssemble);
    pos += (vec3(seed.x, seed.y, seed.x * seed.y) - 0.5) * 26.0 * (1.0 - uAssemble);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // Two forces in view space, so they track the cursor rather than
    // the object's own rotation.
    vec2 rel = mv.xy - uPointer;
    float dist = max(length(rel), 0.001);
    vec2 dir = rel / dist;

    // The cursor parts the ink it passes over.
    mv.xy += dir * smoothstep(11.0, 0.0, dist) * uForce;

    // A keystroke sends one ring outward from the centre and dies.
    if (uRipple > 0.0) {
      float ring = uRipple * 30.0;
      float band = exp(-pow((length(mv.xy) - ring) * 0.42, 2.0));
      mv.xy += normalize(mv.xy + 0.0001) * band * 3.1 * (1.0 - uRipple);
    }

    gl_Position = projectionMatrix * mv;

    float d = -mv.z;
    gl_PointSize = uDpr * uSize * (0.82 + seed.y * 0.42) * (1.0 + band * 0.55) * (34.0 / max(d, 1.0));
    // Distance fades toward the paper instead of toward black.
    vFade = smoothstep(104.0, 20.0, d) * uInk * reveal;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uAtlas;
  varying vec3 vColor;
  varying float vFade;
  varying vec2 vCell;

  void main() {
    // One atlas cell per particle. Below roughly 3px a glyph is only
    // noise, so the alpha carries it and the shape still reads as tone.
    vec2 uv = (vCell + gl_PointCoord) * vec2(0.125, 0.25);
    float a = texture2D(uAtlas, uv).a;
    if (a < 0.04) discard;

    // Light falls from the upper left, so each character picks up a
    // highlight on that shoulder and a shadow on the opposite one. It
    // reads as set type catching the light rather than as flat fill.
    vec2 pc = gl_PointCoord - 0.5;
    float bevel = (-pc.x - pc.y);
    vec3 col = vColor + bevel * 0.17;
    col += smoothstep(0.4, 0.0, distance(gl_PointCoord, vec2(0.3, 0.3))) * 0.16;

    gl_FragColor = vec4(col, a * 0.86 * vFade);
  }
`;

export type DaylightScene = {
  setMorph: (m: number) => void;
  setPointer: (x: number, y: number) => void;
  nudge: (dx: number) => void;
  /** One expanding ring from the centre. Fired when the visitor types. */
  ripple: () => void;
  /** Rebuild the final formation out of the visitor's own words. */
  setText: (text: string) => void;
  /** 0..1. Slides the field left of the fixed panel column, for the wide
   *  raster stages where the picture would otherwise sit under it. */
  setBias: (v: number) => void;
  resize: () => void;
  dispose: () => void;
};

export function createDaylight(
  canvas: HTMLCanvasElement,
  opts: { reduced: boolean; font: string }
): DaylightScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);
  camera.position.set(0, 0, 54);

  const geo = new THREE.BufferGeometry();
  const pixels = pixelRaster(N);
  const edges = edgeRaster(N);
  const forms = [
    chaos(N),
    bytes(N),
    tokens(N),
    attention(N),
    pixels.pos,
    edges.pos,
    wordmark(N, "NOLDAN", opts.font),
  ];
  geo.setAttribute("position", new THREE.BufferAttribute(forms[0], 3));
  forms.slice(1).forEach((f, i) =>
    geo.setAttribute(`p${i + 1}`, new THREE.BufferAttribute(f, 3))
  );

  const seed = new Float32Array(N * 2);
  for (let i = 0; i < N * 2; i++) seed[i] = Math.random();
  geo.setAttribute("seed", new THREE.BufferAttribute(seed, 2));

  const packA = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    packA[i * 3] = Math.floor(Math.random() * 16);
    packA[i * 3 + 1] = pixels.ramp[i];
    packA[i * 3 + 2] = edges.ramp[i];
  }
  geo.setAttribute("packA", new THREE.BufferAttribute(packA, 3));
  geo.setAttribute("cellUV", new THREE.BufferAttribute(pixels.uv, 2));
  geo.setAttribute("rgbA", new THREE.BufferAttribute(pixels.rgb, 3));
  geo.setAttribute("rgbB", new THREE.BufferAttribute(edges.rgb, 3));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 60);

  const uniforms = {
    uMorph: { value: 0 },
    uTime: { value: 0 },
    uSize: { value: 34 },
    uInk: { value: 1 },
    uAssemble: { value: 0 },
    uPointer: { value: new THREE.Vector2(9999, 9999) },
    uForce: { value: 0 },
    uRipple: { value: 0 },
    uScan: { value: 0 },
    uDpr: { value: 1 },
    uAtlas: { value: glyphAtlas() },
    uC0: { value: new THREE.Vector3(...STAGE_COLOR[0]) },
    uC1: { value: new THREE.Vector3(...STAGE_COLOR[1]) },
    uC2: { value: new THREE.Vector3(...STAGE_COLOR[2]) },
    uC3: { value: new THREE.Vector3(...STAGE_COLOR[3]) },
    uC4: { value: new THREE.Vector3(...STAGE_COLOR[4]) },
    uC5: { value: new THREE.Vector3(...STAGE_COLOR[5]) },
    uC6: { value: new THREE.Vector3(...STAGE_COLOR[6]) },
  };

  const material = new THREE.RawShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const points = new THREE.Points(geo, material);
  scene.add(points);

  const pointer = new THREE.Vector2();
  const eased = new THREE.Vector2();
  let morph = 0;
  let target = 0;
  let spin = 0;
  let spinVel = 0;
  let baseSize = 34;
  let assemble = opts.reduced ? 1 : 0;
  let rippleT = -1;
  let bias = 0;
  let biasTarget = 0;
  let baseZ = 54;
  let halfH = 1;
  let halfW = 1;
  let raf = 0;
  const clock = new THREE.Clock();

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const fit = Math.min(1, w / 1180);
    baseZ = 54 + (1 - fit) * 32;
    camera.position.z = baseZ;
    baseSize = 34 * Math.max(0.7, fit);
    camera.updateProjectionMatrix();
    // Half-extents of the z=0 plane, so a normalised pointer can be
    // mapped into the same view space the shader works in.
    halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    halfW = halfH * camera.aspect;
  };
  resize();

  const frame = () => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();

    morph += (target - morph) * (opts.reduced ? 1 : 0.085);
    uniforms.uMorph.value = morph;
    uniforms.uTime.value = opts.reduced ? 0 : t;

    let ink = 0;
    let sizeMul = 0;
    for (let i = 0; i < STAGES; i++) {
      const w = Math.max(0, 1 - Math.abs(morph - i));
      ink += w * PACKING[i];
      sizeMul += w * SIZING[i];
    }
    uniforms.uInk.value = ink;
    uniforms.uDpr.value = renderer.getPixelRatio();
    // Frozen mid-sweep under reduced motion: the scan still explains the
    // mechanism, it just stops travelling.
    uniforms.uScan.value = opts.reduced ? 0.5 : t * 0.15;
    uniforms.uSize.value = baseSize * sizeMul;

    if (assemble < 1) {
      assemble = Math.min(1, assemble + dt * 0.62);
      const e = 1 - Math.pow(1 - assemble, 3);
      uniforms.uAssemble.value = e;
    }

    if (rippleT >= 0) {
      rippleT += dt / 1.35;
      uniforms.uRipple.value = rippleT >= 1 ? 0 : rippleT;
      if (rippleT >= 1) rippleT = -1;
    }

    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;

    uniforms.uPointer.value.set(pointer.x * halfW, pointer.y * halfH);
    const wantForce = opts.reduced ? 0 : 2.6;
    uniforms.uForce.value += (wantForce - uniforms.uForce.value) * 0.08;

    // Drag turns the field, but it always eases back to face-on. These
    // formations are diagrams before they are objects: left side-on,
    // the causal triangle collapses into an unreadable sliver.
    // Relief lives in stages 3, 4 and 5, so the turn opens up where
    // there is depth to reveal and stays quiet where the shape is flat.
    let relief = 0;
    for (const i of [3, 4, 5]) {
      relief += Math.max(0, 1 - Math.abs(morph - i));
    }
    spinVel *= 0.93;
    spin += spinVel;
    // A drag settles back into the ambient turn rather than to zero.
    spin *= 0.94;
    const autoYaw = Math.sin(t * 0.17) * 0.2 * (0.4 + relief * 0.6);
    const autoPitch = Math.cos(t * 0.13) * 0.1 * relief;
    camera.position.x = eased.x * 5;
    camera.position.y = eased.y * 3.4;
    bias += (biasTarget - bias) * 0.07;
    // The raster is the widest and tallest formation by a long way, so
    // the camera steps back for it. Without this the larger cells that
    // make the characters readable also crop the picture.
    camera.position.z = baseZ + bias * 9;
    points.position.x = -bias * 3.0;
    points.rotation.y = spin + eased.x * 0.13 + (opts.reduced ? 0 : autoYaw);
    points.rotation.x = -eased.y * 0.09 + (opts.reduced ? 0 : autoPitch);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    void dt;
  };
  frame();

  return {
    setMorph: (m) => {
      target = Math.max(0, Math.min(STAGES - 1, m));
    },
    setPointer: (x, y) => pointer.set(x, y),
    setBias: (v) => {
      biasTarget = Math.max(0, Math.min(1, v));
    },
    ripple: () => {
      if (opts.reduced) return;
      rippleT = 0;
    },
    setText: (text) => {
      const clean = text.trim().slice(0, 22) || "NOLDAN";
      const next = wordmark(N, clean.toUpperCase(), opts.font);
      const attr = geo.getAttribute("p6") as THREE.BufferAttribute;
      attr.copyArray(next);
      attr.needsUpdate = true;
    },
    nudge: (dx) => {
      spinVel += dx * 0.0022;
    },
    resize,
    dispose: () => {
      cancelAnimationFrame(raf);
      geo.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
