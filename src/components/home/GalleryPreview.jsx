import React, { useMemo, useState } from "react";
import { GALLERY } from "../../data/gallery";
import { ArrowRight } from "lucide-react";

function MarqueeRow({ items, direction }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden rounded-card border border-black/5 bg-white shadow-card"
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="whitespace-nowrap">
        <div
          className={["marquee", direction === "left" ? "marquee-left" : "marquee-right", "flex"].join(" ")}
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {doubled.map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              className="group relative w-[210px] sm:w-[230px] h-40 sm:h-44 overflow-hidden"
            >
              <img src={img.src} alt={img.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-white font-body text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPreview() {
  const items = useMemo(() => GALLERY.slice(0, 8), []);

  return (
    <section id="gallery" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap" data-reveal>
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal">Visual Stories</h2>
            <div className="mt-4 mx-auto w-36 h-1 rounded-pill bg-accent" />
          </div>
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 font-body font-semibold text-primary hover:text-primary-light transition-colors"
          >
            View Full Gallery <ArrowRight size={18} />
          </a>
        </div>

        <div className="mt-10 hidden md:block space-y-5">
          <MarqueeRow items={items} direction="left" />
          <MarqueeRow items={items} direction="right" />
        </div>

        <div className="mt-10 md:hidden">
          <MarqueeRow items={items} direction="left" />
        </div>
      </div>
    </section>
  );
}

