"use client";

import { useEffect, useRef } from "react";

/** An original point-cloud smile study, rather than borrowed medical scan imagery. */
export function SmileField({ phase = 0, still = false }: { phase?: number; still?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    const rotation = phase * 0.55;
    let started: number | undefined;
    const points: { x: number; y: number; z: number; size: number }[] = [];
    // Deterministic sampling keeps the image stable between mounts.
    for (let ring = 0; ring < 112; ring++) {
      const angle = (ring / 111) * Math.PI;
      for (let tube = 0; tube < 24; tube++) {
        const around = (tube / 24) * Math.PI * 2;
        const radius = 0.15 + Math.sin(angle) * 0.055;
        points.push({
          x: Math.cos(angle) * (1.04 + Math.cos(around) * radius),
          y: -Math.sin(angle) * (0.78 + Math.cos(around) * radius) + 0.36,
          z: Math.sin(around) * radius,
          size: 0.8 + (tube % 4) * 0.16,
        });
      }
    }

    const draw = (now: number) => {
      frame = 0;
      if (!visible) return;
      started ??= now;
      const time = media.matches || still ? 0 : Math.min((now - started) / 1000, 4);
      const ry = -0.28 + rotation + Math.sin(time * 0.18) * 0.13;
      const rx = 0.13 + Math.cos(time * 0.17) * 0.06;
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width * 0.37, height * 0.43);
      const sweep = ((time * 0.22) % 2) - 1;
      const projected = points.map((point) => {
        const x = point.x * Math.cos(ry) + point.z * Math.sin(ry);
        const z = -point.x * Math.sin(ry) + point.z * Math.cos(ry);
        const y = point.y * Math.cos(rx) - z * Math.sin(rx);
        return { x, y, z, size: point.size };
      }).sort((a, b) => a.z - b.z);
      for (const point of projected) {
        const perspective = 3 / (3 - point.z);
        const glow = Math.max(0, 1 - Math.abs(point.y - sweep) * 9);
        const alpha = Math.min(0.9, 0.24 + (point.z + 0.5) * 0.44 + glow * 0.3);
        context.fillStyle = `rgba(150, 65, 96, ${alpha})`;
        context.beginPath();
        context.arc(width / 2 + point.x * scale * perspective, height / 2 - point.y * scale * perspective, point.size * perspective, 0, Math.PI * 2);
        context.fill();
      }
      // Decorative motion settles within four seconds; it never loops forever.
      if (!media.matches && !still && time < 4) frame = requestAnimationFrame(draw);
    };

    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (frame) cancelAnimationFrame(frame);
      frame = visible ? requestAnimationFrame(draw) : 0;
    });
    const updatePreference = () => {
      started = undefined;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    resize.observe(canvas);
    visibility.observe(canvas);
    media.addEventListener("change", updatePreference);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      media.removeEventListener("change", updatePreference);
    };
  }, [phase, still]);

  return <canvas ref={canvasRef} className="smile-field" aria-hidden="true" />;
}
