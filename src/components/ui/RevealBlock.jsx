import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../animations/deviceConfig";

gsap.registerPlugin(ScrollTrigger);

export default function RevealBlock({
  children,
  className = "",
  yFrom = 22,
  duration = 0.75,
  delay = 0
}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    el.style.willChange = "transform, opacity";

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: yFrom },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        onComplete: () => {
          el.style.willChange = "auto";
        }
      }
    );

    return () => {
      const st = tween.scrollTrigger;
      tween.kill();
      if (st && typeof st.kill === "function") st.kill();
    };
  }, [prefersReducedMotion, yFrom, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

