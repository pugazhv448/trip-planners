import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ANIMATION_DEFAULTS } from "./constants";
import { usePrefersReducedMotion } from "./deviceConfig";

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return;

    // If user prefers reduced motion, show everything immediately.
    if (prefersReducedMotion) {
      elements.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const tweens = [];

    elements.forEach((el, idx) => {
      const rawDelay = el.getAttribute("data-delay");
      const delay = rawDelay ? Number(rawDelay) : idx * ANIMATION_DEFAULTS.revealStagger;

      // Only animate transform + opacity.
      el.style.willChange = "transform, opacity";

      const tween = gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: Number(el.getAttribute("data-duration")) || ANIMATION_DEFAULTS.revealDuration,
          ease: ANIMATION_DEFAULTS.ease,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          onComplete: () => {
            // After animation, switch will-change back to auto to avoid perf cost.
            el.style.willChange = "auto";
          }
        }
      );

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => {
        const st = tween.scrollTrigger;
        tween.kill();
        if (st && typeof st.kill === "function") st.kill();
      });
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion]);
}

