"use client";

import { useEffect } from "react";

/**
 * Animates the tab icon: the moon drifts across the sun and the corona pulses.
 * Redraws a small canvas into its own <link rel="icon">, which browsers prefer over
 * the static app/icon.svg. Safari ignores favicon swaps and keeps the static icon.
 */
export default function AnimatedFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const S = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = S;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);

    const draw = (t: number) => {
      const c = S / 2;
      const pulse = 0.75 + 0.25 * Math.sin(t * 2.2);
      ctx.clearRect(0, 0, S, S);

      const glow = ctx.createRadialGradient(c, c, 14, c, c, 32);
      glow.addColorStop(0, `rgba(255,107,26,${0.95 * pulse})`);
      glow.addColorStop(1, "rgba(255,107,26,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, S, S);

      ctx.fillStyle = "#ffb56b";
      ctx.beginPath();
      ctx.arc(c, c, 21, 0, Math.PI * 2);
      ctx.fill();

      // moon eases back and forth across the sun, lingering near totality
      const k = Math.sin(t * 0.6);
      ctx.fillStyle = "#0e0d0c";
      ctx.beginPath();
      ctx.arc(c + k * 14, c - k * 5, 20.5, 0, Math.PI * 2);
      ctx.fill();

      link.href = canvas.toDataURL("image/png");
    };

    let id = 0;
    const start = performance.now();
    const run = () => {
      clearInterval(id);
      if (document.hidden) return;
      id = window.setInterval(() => draw((performance.now() - start) / 1000), 120);
    };
    run();
    document.addEventListener("visibilitychange", run);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", run);
      link.remove();
    };
  }, []);

  return null;
}
