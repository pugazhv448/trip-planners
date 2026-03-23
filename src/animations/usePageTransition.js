import { useMemo } from "react";
import { DEVICE_TIERS } from "./constants";
import { useDeviceTier, usePrefersReducedMotion } from "./deviceConfig";

export function usePageTransition() {
  const tier = useDeviceTier();
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } }
      };
    }

    const y = tier === DEVICE_TIERS.FULL ? 22 : tier === DEVICE_TIERS.STANDARD ? 14 : 8;
    return {
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0, transition: { duration: tier === DEVICE_TIERS.FULL ? 0.55 : 0.35, ease: "easeOut" } },
      exit: { opacity: 0, y: -y / 2, transition: { duration: tier === DEVICE_TIERS.FULL ? 0.35 : 0.25, ease: "easeIn" } }
    };
  }, [prefersReducedMotion, tier]);
}

