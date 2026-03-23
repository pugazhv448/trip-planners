import { useEffect, useMemo, useState } from "react";
import { DEVICE_TIERS } from "./constants";
import { useDeviceTier, usePrefersReducedMotion } from "./deviceConfig";

/**
 * Lightweight guard to optionally reduce animation intensity on low-end devices.
 * Returns a boolean that can be used by components/hooks.
 */
export function usePerformanceMonitor() {
  const tier = useDeviceTier();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [allowHeavyMotion, setAllowHeavyMotion] = useState(true);

  const defaults = useMemo(() => {
    if (prefersReducedMotion) return false;
    if (tier === DEVICE_TIERS.LITE) return false;
    return true;
  }, [prefersReducedMotion, tier]);

  useEffect(() => {
    // Simple heuristics only; avoids extra layout/measurement costs.
    if (!defaults) {
      setAllowHeavyMotion(false);
      return;
    }

    const memGB = typeof navigator !== "undefined" && navigator.deviceMemory ? navigator.deviceMemory : 8;
    const cores = typeof navigator !== "undefined" && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 8;

    // Turn down heavy motion if the device looks constrained.
    if (memGB <= 4 || cores <= 4) setAllowHeavyMotion(false);
    else setAllowHeavyMotion(true);
  }, [defaults]);

  return { allowHeavyMotion };
}

