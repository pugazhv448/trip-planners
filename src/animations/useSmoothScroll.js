import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./deviceConfig";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      lerp: 0.1
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);
    const onTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTicker);

    const onRefresh = () => {
      ScrollTrigger.refresh();
    };

    // Keep ScrollTrigger in sync after resize/orientation changes.
    window.addEventListener("resize", onRefresh, { passive: true });

    return () => {
      window.removeEventListener("resize", onRefresh);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return lenisRef;
}

