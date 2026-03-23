import React from "react";

/**
 * Simple parallax wrapper. The actual scroll motion is handled by `useParallax()`,
 * which targets elements marked with `data-parallax`.
 *
 * Note: children are used so other transform tweens (e.g. Ken Burns scale) can
 * live on an inner wrapper without conflicting with parallax `y`.
 */
export default function ParallaxImage({ className = "", speed = 0.12, children }) {
  return (
    <div className={className} data-parallax data-parallax-speed={speed}>
      {children}
    </div>
  );
}

