import React, { useEffect } from "react";
import { SITE } from "../data/siteConfig";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { useReveal } from "../animations/useReveal";

function setSEO({ title, description, keywords, ogTitle, ogDescription }) {
  document.title = title;

  const setMetaByName = (name, value) => {
    if (!value) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  };

  const setMetaByProperty = (property, value) => {
    if (!value) return;
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  };

  setMetaByName("description", description);
  setMetaByName("keywords", keywords);
  setMetaByProperty("og:title", ogTitle || title);
  setMetaByProperty("og:description", ogDescription || description);
}

export default function Gallery() {
  useReveal();
  useEffect(() => {
    setSEO({
      title: `${SITE.name} | Wayanad Gallery from Kozhikode`,
      description: "Explore Wayanad through nature photos — hills, waterfalls, lakes, treks, cottages and campfire nights.",
      keywords: "wayanad gallery, wayanad photos, kozhikode to wayanad, sightseeing highlights",
      ogTitle: `${SITE.name} Gallery`,
      ogDescription: "Nature-rich Wayanad photo stories with hills, waterfalls, lakes, and treks."
    });
  }, []);

  return (
    <main>
      <section className="relative h-[35svh] min-h-[260px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600"
            alt="Wayanad nature"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(26,71,49,0.78) 100%)" }}
        />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="font-display font-bold text-white text-3xl sm:text-5xl">Gallery</h1>
            <p className="mt-3 text-white/90 font-body text-sm sm:text-base">
              Nature moments from Wayanad — filter by category and explore.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid />

          <div className="mt-12 rounded-card border border-black/5 bg-white shadow-card p-7 sm:p-9">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-charcoal">Follow us on Instagram</div>
              <div className="mt-2 text-sm text-charcoal/70 font-body">@wayanad_wild_ways</div>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-primary text-white font-body font-semibold py-3 px-6 shadow-card-hover"
                style={{ touchAction: "manipulation" }}
              >
                Visit Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

