import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/testimonials";

export default function Testimonials() {
  const items = useMemo(() => TESTIMONIALS, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setIndex((v) => (v + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [paused, items.length]);

  const goPrev = () => setIndex((v) => (v - 1 + items.length) % items.length);
  const goNext = () => setIndex((v) => (v + 1) % items.length);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-reveal>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal">Testimonials</h2>
          <div className="mt-4 mx-auto w-28 h-1 rounded-pill bg-accent" />
        </div>

        <div
          className="mt-10 relative"
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-card border border-black/5 bg-white shadow-card">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {items.map((t) => (
                <div key={t.id} className="min-w-full p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-body font-semibold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-body font-semibold text-charcoal">{t.name}</div>
                        <div className="text-sm text-charcoal/60 font-body">{t.handle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill="#d4a853" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-charcoal/80 font-body text-sm sm:text-base leading-relaxed">
                    “{t.text}”
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 border border-black/5 flex items-center justify-center shadow-card"
          >
            <ChevronLeft size={18} className="text-charcoal" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 border border-black/5 flex items-center justify-center shadow-card"
          >
            <ChevronRight size={18} className="text-charcoal" />
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {items.map((t, i) => {
              const active = i === index;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={[
                    "h-2.5 rounded-full transition-all duration-300",
                    active ? "w-7 bg-accent" : "w-2.5 bg-charcoal/20 hover:bg-charcoal/35"
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

