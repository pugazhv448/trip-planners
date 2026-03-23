import { useEffect, useMemo, useState } from "react";
import { DEVICE_TIERS, TIER_BREAKPOINTS } from "./constants";

function getTier() {
  if (typeof window === "undefined") return DEVICE_TIERS.LITE;
  const w = window.innerWidth;
  if (w >= TIER_BREAKPOINTS.FULL_MIN_WIDTH) return DEVICE_TIERS.FULL;
  if (w >= TIER_BREAKPOINTS.STANDARD_MIN_WIDTH) return DEVICE_TIERS.STANDARD;
  return DEVICE_TIERS.LITE;
}

export function useDeviceTier() {
  const [tier, setTier] = useState(getTier);

  useEffect(() => {
    const onResize = () => setTier(getTier());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return tier;
}

export function usePrefersReducedMotion() {
  const mq = useMemo(() => {
    if (typeof window === "undefined") return null;
    return window.matchMedia("(prefers-reduced-motion: reduce)");
  }, []);

  const [reduced, setReduced] = useState(() => {
    if (!mq) return false;
    return mq.matches;
  });

  useEffect(() => {
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [mq]);

  return reduced;
}

export { getTier };
export { DEVICE_TIERS };

