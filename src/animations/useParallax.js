import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DEVICE_TIERS } from "./constants";
import { useDeviceTier, usePrefersReducedMotion } from "./deviceConfig";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger parallax for elements marked with `data-parallax`.
 * Only animates `transform` (via `y`) and respects reduced motion + LITE tier.
 */
export function useParallax() {
  const tier = useDeviceTier();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (tier === DEVICE_TIERS.LITE) return;

    const elements = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!elements.length) return;

    const tweens = [];

    elements.forEach((el) => {
      const rawSpeed = el.getAttribute("data-parallax-speed");
      const speed = rawSpeed ? Number(rawSpeed) : 0.12;
      if (!Number.isFinite(speed)) return;

      // Translate range is intentionally small for a premium "cinematic" feel.
      const maxY = speed * 120;

      // Parallax only: scale/other transforms should live on child elements.
      el.style.willChange = "transform";

      const tween = gsap.fromTo(
        el,
        { y: maxY },
        {
          y: -maxY,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onLeave: () => {
              el.style.willChange = "auto";
            },
            onLeaveBack: () => {
              el.style.willChange = "auto";
            }
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
  }, [tier, prefersReducedMotion]);
}

