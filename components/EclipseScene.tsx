"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const coronaVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Sun radius is 1.0 in plane units. Streamers come from fbm noise sampled on the
// unit circle so there is no seam where atan() wraps.
const coronaFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uOffset;
  uniform float uSize;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float r = length(p);
    vec2 dir = p / max(r, 1e-4);
    float edge = max(r - 1.0, 0.0);

    float n1 = fbm(dir * 2.6 + vec2(edge * 0.9 - uTime * 0.06, uTime * 0.025));
    float n2 = fbm(dir * 7.0 + vec2(-edge * 2.2 - uTime * 0.04, 3.1));
    float streak = pow(n1, 2.2) * 2.4 + n2 * 0.35;

    float glow  = exp(-edge * 2.6) * (0.35 + streak);
    float halo  = exp(-edge * 0.75) * 0.14;
    float inner = exp(-edge * 16.0) * 1.3;
    float disk  = 1.0 - smoothstep(0.985, 1.0, r);

    // "diamond ring" — a bead of light on the limb the moon is uncovering
    vec2 od = length(uOffset) > 1e-4 ? normalize(-uOffset) : vec2(0.0);
    float bead = exp(-length(p - od) * 5.0) * clamp(length(uOffset) * 14.0, 0.0, 1.6);

    float I = (glow + halo + inner + bead + disk * 2.0) * uIntensity;

    vec3 deep = vec3(1.0, 0.32, 0.04);
    vec3 warm = vec3(1.0, 0.62, 0.26);
    vec3 hot  = vec3(1.0, 0.93, 0.82);
    vec3 col = mix(deep, warm, clamp(inner * 0.8 + streak * 0.25, 0.0, 1.0));
    col = mix(col, hot, clamp(bead * 0.7 + inner * 0.35 + disk, 0.0, 1.0));

    float fade = 1.0 - smoothstep(uSize * 0.36, uSize * 0.5, r);
    gl_FragColor = vec4(col * I * fade, 1.0);
  }
`;

const moonVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const moonFragment = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform vec2 uOffset;
  uniform float uIntensity;

  float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  void main() {
    float facing = max(vNormal.z, 0.0);
    float rim = pow(1.0 - facing, 3.5);
    // brighter rim on the side where the sun peeks out
    vec2 sunSide = length(uOffset) > 1e-4 ? normalize(-uOffset) : vec2(0.0);
    float side = 0.55 + 0.45 * dot(normalize(vNormal.xy + 1e-4), sunSide);
    float surface = noise(vPos * 4.0) * 0.5 + noise(vPos * 11.0) * 0.25;

    vec3 base = vec3(0.028, 0.025, 0.022) + surface * 0.018;
    vec3 col = base + vec3(1.0, 0.42, 0.1) * rim * side * 0.9 * uIntensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function EclipseScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      // Deferred so the fallback render isn't a synchronous setState inside the effect.
      queueMicrotask(() => setFailed(true));
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // opaque, matching --ink, so additive passes never punch alpha holes in the canvas
    renderer.setClearColor(0x0e0d0c, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 11;

    const system = new THREE.Group();
    scene.add(system);

    const SIZE = 9;
    const coronaUniforms = {
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uOffset: { value: new THREE.Vector2(0, 0) },
      uSize: { value: SIZE },
    };
    const corona = new THREE.Mesh(
      new THREE.PlaneGeometry(SIZE, SIZE),
      new THREE.ShaderMaterial({
        vertexShader: coronaVertex,
        fragmentShader: coronaFragment,
        uniforms: coronaUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    system.add(corona);

    const moonUniforms = { uOffset: coronaUniforms.uOffset, uIntensity: coronaUniforms.uIntensity };
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      new THREE.ShaderMaterial({ vertexShader: moonVertex, fragmentShader: moonFragment, uniforms: moonUniforms }),
    );
    moon.position.z = 0.35;
    // Moon sits slightly closer to camera, so scale it down to match the sun's apparent size
    moon.scale.setScalar(0.985 * (camera.position.z - 0.35) / camera.position.z);
    system.add(moon);

    // drifting dust / star field
    const COUNT = 900;
    const pos = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 1.6 + Math.pow(Math.random(), 0.7) * 9;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.75;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      seeds[i] = Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dustGeo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.ShaderMaterial({
        uniforms: { uTime: coronaUniforms.uTime, uPx: { value: renderer.getPixelRatio() } },
        vertexShader: /* glsl */ `
          attribute float seed;
          uniform float uTime;
          uniform float uPx;
          varying float vA;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.2 + seed * 2.4) * uPx * (10.0 / -mv.z);
            vA = 0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * (0.6 + seed) + seed * 40.0));
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vA;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d) * vA;
            gl_FragColor = vec4(vec3(1.0, 0.6, 0.3) * a, 1.0);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(dust);

    // layout: eclipse sits right on wide screens, top-center on narrow ones
    const layout = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (w > 900) {
        system.position.set(2.6 * Math.min(camera.aspect / 1.6, 1.3), 0.35, 0);
        system.scale.setScalar(1);
      } else {
        system.position.set(0, w < 560 ? 2.05 : 1.8, 0);
        system.scale.setScalar(w < 560 ? 0.72 : 0.9);
      }
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);

    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const clock = new THREE.Clock();
    const offset = new THREE.Vector2();
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = reduced ? 4 : clock.getElapsedTime();

      // intro: moon glides in from lower-left and totality "forms"
      const intro = Math.min(t / 3.2, 1);
      const ease = 1 - Math.pow(1 - intro, 3);
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);

      mouse.lerp(target, 0.05);
      offset.set(
        (1 - ease) * -1.1 + mouse.x * 0.09 + scroll * 0.55,
        (1 - ease) * -0.5 + mouse.y * 0.07 + scroll * 0.2,
      );
      moon.position.x = offset.x;
      moon.position.y = offset.y;
      coronaUniforms.uOffset.value.copy(offset);
      coronaUniforms.uTime.value = t;
      coronaUniforms.uIntensity.value = 0.25 + ease * 0.75;

      system.rotation.y = mouse.x * 0.12;
      system.rotation.x = -mouse.y * 0.08;
      dust.rotation.z = t * 0.012;
      dust.position.x = mouse.x * -0.25;
      dust.position.y = mouse.y * -0.18;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden />
      {failed && <div className="hero-fallback" aria-hidden />}
    </>
  );
}
