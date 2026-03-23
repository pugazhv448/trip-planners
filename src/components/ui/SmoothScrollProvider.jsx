import React, { createContext, useContext, useMemo } from "react";
import { useSmoothScroll } from "../../animations/useSmoothScroll";

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: () => {}
});

export function useSmoothScrollContext() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useSmoothScroll();

  const api = useMemo(() => {
    return {
      lenis: lenisRef.current,
      scrollTo: (target, opts = {}) => {
        const { offset = 0, ...rest } = opts;
        const lenis = lenisRef.current;

        // Resolve target to an element.
        let el = target;
        if (typeof target === "string") el = document.querySelector(target);

        if (typeof target === "number") {
          if (lenis) lenis.scrollTo(target, rest);
          else window.scrollTo({ top: target, behavior: "smooth" });
          return;
        }

        if (!el) return;

        const y = window.scrollY + el.getBoundingClientRect().top - offset;
        if (lenis) lenis.scrollTo(y, rest);
        else window.scrollTo({ top: y, behavior: "smooth" });
      }
    };
  }, [lenisRef]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}

