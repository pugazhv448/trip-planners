import React from "react";
import { useCursor } from "../../animations/useCursor";

export default function CustomCursor() {
  const { dotRef, followerRef } = useCursor();

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[1000] pointer-events-none h-2 w-2 rounded-full bg-accent" />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[1000] pointer-events-none h-7 w-7 rounded-full border border-accent/70"
      />
    </>
  );
}

