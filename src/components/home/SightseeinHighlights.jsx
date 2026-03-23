import React from "react";

const HIGHLIGHTS = [
  {
    name: "Lakkidi View Point",
    tag: "Misty hilltop magic",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
  },
  {
    name: "Pookode Lake",
    tag: "Serene freshwater escape",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
  },
  {
    name: "Soojipara Waterfall",
    tag: "Crystal cascade",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
  },
  {
    name: "En Ooru Tribal Village",
    tag: "Ancient culture",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
  },
  {
    name: "Edakkal Cave",
    tag: "5,000 year old engravings",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&sat=-20"
  },
  {
    name: "Karapuzha Lake",
    tag: "Peaceful reservoir",
    src: "https://images.unsplash.com/photo-1500043357865-c6b853a0b23b?w=800"
  },
  {
    name: "900 Kandi Glass Bridge",
    tag: "Walk above the clouds",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&sat=10"
  },
  {
    name: "Plantation Walk",
    tag: "Tea & coffee estates",
    src: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=800"
  }
];

export default function SightseeinHighlights() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-reveal>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal">Sightseeing Highlights</h2>
          <div className="mt-4 mx-auto w-28 h-1 rounded-pill bg-accent" />
        </div>

        <div className="mt-10">
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.name}
                className="flex-shrink-0 w-[200px] sm:w-[220px] snap-start bg-white rounded-card border border-black/5 shadow-card p-3 transition-transform duration-300 hover:-translate-y-2"
                  data-reveal
              >
                <div className="relative overflow-hidden rounded-image">
                  <img src={h.src} alt={h.name} className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-primary/70" />
                </div>
                <div className="mt-3">
                  <div className="font-body font-semibold text-charcoal text-sm leading-snug">{h.name}</div>
                  <div className="mt-1 font-body text-xs text-charcoal/70">{h.tag}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-sm text-charcoal/60 font-body">
            Swipe to explore more
          </div>
        </div>
      </div>
    </section>
  );
}

