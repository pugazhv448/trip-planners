import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { DEVICE_TIERS } from "../../animations/constants";
import { useDeviceTier, usePrefersReducedMotion } from "../../animations/deviceConfig";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false
}) {
  const ref = useRef(null);
  const tier = useDeviceTier();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const isDesktop = tier === DEVICE_TIERS.FULL;
    if (!isDesktop || prefersReducedMotion || disabled) return;

    const max = 10; // px
    let hover = false;

    gsap.set(el, { willChange: "transform" });

    const onMove = (e) => {
      if (!hover) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const tx = (dx / rect.width) * max;
      const ty = (dy / rect.height) * max;

      gsap.to(el, {
        x: tx,
        y: ty,
        duration: 0.25,
        ease: "power3.out"
      });
    };

    const onEnter = () => {
      hover = true;
    };

    const onLeave = () => {
      hover = false;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "power3.out"
      });
    };

    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    el.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
      gsap.set(el, { willChange: "auto" });
    };
  }, [tier, prefersReducedMotion, disabled]);

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ touchAction: "manipulation" }}
    >
      {children}
    </button>
  );
}

