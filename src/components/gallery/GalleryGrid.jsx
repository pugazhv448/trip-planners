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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4" data-reveal>
        {filtered.map((img) => (
          <div key={img.id} className="break-inside-avoid mb-4">
            <div className="group relative rounded-image overflow-hidden border border-black/5">
              <img src={img.src} alt={img.caption} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-white font-body text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

