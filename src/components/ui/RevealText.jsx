import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../animations/deviceConfig";

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({
  children,
  className = "",
  as: Tag = "span",
  stagger = 0.03,
  yFrom = 18,
  duration = 0.75
}) {
  const rootRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const words = useMemo(() => {
    const text = typeof children === "string" ? children : children?.toString?.() || "";
    // Preserve spaces by splitting into tokens.
    return text.split(/(\s+)/).filter(Boolean);
  }, [children]);

  useEffect(() => {
    if (!rootRef.current) return;

    const el = rootRef.current;
    const spans = Array.from(el.querySelectorAll("[data-word]"));

    if (!spans.length) return;

    if (prefersReducedMotion) {
      gsap.set(spans, { opacity: 1, y: 0 });
      return;
    }

    spans.forEach((s) => {
      s.style.willChange = "transform, opacity";
      gsap.set(s, { opacity: 0, y: yFrom });
    });

    const tween = gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      ease: "power3.out",
      stagger,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      onComplete: () => {
        spans.forEach((s) => {
          s.style.willChange = "auto";
        });
      }
    });

    return () => {
      const st = tween.scrollTrigger;
      tween.kill();
      if (st && typeof st.kill === "function") st.kill();
    };
  }, [prefersReducedMotion, stagger, yFrom, duration, words.length]);

  return (
    <Tag ref={rootRef} className={className} aria-label={typeof children === "string" ? children : undefined}>
      {words.map((token, idx) => {
        if (/^\s+$/.test(token)) return <span key={`sp-${idx}`}>{token}</span>;
        return (
          <span key={`w-${idx}`} data-word className="inline-block">
            {token}
          </span>
        );
      })}
    </Tag>
  );
}

