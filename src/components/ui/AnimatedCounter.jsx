import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AnimatedCounter({
  value = 0,
  suffix = "",
  prefix = "",
  label = "",
  duration = 1.2
}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  const target = useMemo(() => Number(value) || 0, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = null;
    let cancelled = false;
    let started = false;

    const reduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
    if (reduce) {
      setDisplay(target);
      return;
    }

    const start = () => {
      if (started) return;
      started = true;

      const from = 0;
      const startTime = performance.now();
      const durMs = Math.max(300, duration * 1000);

      const tick = (now) => {
        if (cancelled) return;
        const t = Math.min(1, (now - startTime) / durMs);
        // Smooth ease-out without layout/extra libs.
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.round(from + (target - from) * eased);
        setDisplay(v);
        if (t < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) start();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl sm:text-6xl tracking-tight text-white">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm sm:text-base font-body text-white/90">{label}</div>
    </div>
  );
}

