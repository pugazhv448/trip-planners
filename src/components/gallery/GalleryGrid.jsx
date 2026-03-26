import React, { useMemo, useState } from "react";
import { GALLERY } from "../../data/gallery";

const TABS = [
  { id: "all", label: "All" },
  { id: "hills", label: "Hills" },
  { id: "waterfall", label: "Waterfalls" },
  { id: "trek", label: "Trekking" },
  { id: "cottage", label: "Cottages" },
  { id: "lake", label: "Lakes" },
  { id: "campfire", label: "Campfire" },
  { id: "glassBridge", label: "Glass Bridge" }
];

function matchesTab(img, tabId) {
  if (tabId === "all") return true;
  if (tabId === "hills") return img.category === "hills" || img.category === "plantation";
  if (tabId === "trek") return img.category === "trek" || img.category === "plantation";
  return img.category === tabId;
}

export default function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = useMemo(() => {
    return GALLERY.filter((img) => matchesTab(img, activeTab));
  }, [activeTab]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3" data-reveal>
        {TABS.map((t) => {
          const active = t.id === activeTab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={[
                "shrink-0 px-4 py-2 rounded-pill border font-body font-semibold text-sm transition-colors",
                active ? "bg-primary text-white border-primary" : "bg-white border-black/10 text-charcoal/80 hover:border-primary/40"
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal>
        {filtered.map((img) => (
          <div key={img.id} className="relative group rounded-2xl overflow-hidden pseudo-border aspect-[4/5] bg-neutral-100" data-reveal>
            <img
              src={img.src}
              alt={img.caption || "Wayanad Visual Story"}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80";
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="text-white font-body text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

