import React, { useEffect } from "react";
import BrandStory from "../components/about/BrandStory";
import { SITE } from "../data/siteConfig";
import { useReveal } from "../animations/useReveal";

function setSEO({ title, description, keywords, ogTitle, ogDescription }) {
  document.title = title;

  const setMetaByName = (name, value) => {
    if (!value) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      el.setAttribute("content", value);
      document.head.appendChild(el);
    } else {
      el.setAttribute("content", value);
    }
  };

  const setMetaByProperty = (property, value) => {
    if (!value) return;
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      el.setAttribute("content", value);
      document.head.appendChild(el);
    } else {
      el.setAttribute("content", value);
    }
  };

  setMetaByName("description", description);
  setMetaByName("keywords", keywords);
  setMetaByProperty("og:title", ogTitle);
  setMetaByProperty("og:description", ogDescription);
}

export default function About() {
  useReveal();
  useEffect(() => {
    setSEO({
      title: `About ${SITE.name} | Local Wayanad Travel Operator`,
      description: "Learn about WAYANAD WILD WAYS — our philosophy, local expertise, safe stays, and 24/7 WhatsApp support.",
      keywords: "Wayanad travel operator, Wayanad tour packages, local experts, private cab, WhatsApp support",
      ogTitle: `About ${SITE.name}`,
      ogDescription: "Local Wayanad travel operator with private transport, vetted stays, and budget-honest pricing."
    });
  }, []);

  return (
    <main>
      <section className="relative h-[35svh] min-h-[260px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=1600"
            alt="Wayanad forest and mist"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(26,71,49,0.75) 100%)" }}
        />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full text-center">
            <div className="inline-flex items-center rounded-pill bg-white/10 border border-white/15 px-4 py-2">
              <span className="font-accent italic text-accent-light">Where the Wild Calls Your Name</span>
            </div>
            <h1 className="mt-5 font-display font-bold text-white text-3xl sm:text-5xl">About Us</h1>
            <p className="mt-3 text-white/90 font-body text-sm sm:text-base">
              Local experts, safe stays, private cabs, and WhatsApp planning support.
            </p>
          </div>
        </div>
      </section>

      <BrandStory />
    </main>
  );
}

