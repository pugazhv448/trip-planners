import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DEVICE_TIERS } from "./constants";
import { useDeviceTier, usePrefersReducedMotion } from "./deviceConfig";

export function useCursor() {
  const tier = useDeviceTier();
  const prefersReducedMotion = usePrefersReducedMotion();

  const dotRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    const isDesktop = tier === DEVICE_TIERS.FULL;
    const pointerCoarse = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(pointer: coarse)").matches : false;

    if (!isDesktop || prefersReducedMotion || pointerCoarse) {
      dot.style.display = "none";
      follower.style.display = "none";
      return;
    }

    dot.style.display = "block";
    follower.style.display = "block";

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let followerX = targetX;
    let followerY = targetY;

    const setDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const setFollower = gsap.quickTo(follower, "x", { duration: 0.2, ease: "power3.out" });
    const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.2, ease: "power3.out" });

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setDot(targetX);
      setDotY(targetY);
    };

    const onFrame = () => {
      followerX += (targetX - followerX) * 0.12;
      followerY += (targetY - followerY) * 0.12;
      setFollower(followerX);
      setFollowerY(followerY);
      rafId = requestAnimationFrame(onFrame);
    };

    let rafId = requestAnimationFrame(onFrame);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      gsap.killTweensOf([dot, follower]);
    };
  }, [tier, prefersReducedMotion]);

  return { dotRef, followerRef };
}

