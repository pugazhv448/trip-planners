import React, { useEffect, useMemo } from "react";
import { SITE } from "../data/siteConfig";
import ContactForm from "../components/contact/ContactForm";
import { MessageCircle } from "lucide-react";
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

export default function Contact() {
  useReveal();
  useEffect(() => {
    setSEO({
      title: `${SITE.name} | Contact & Book Wayanad Packages`,
      description:
        "Enquire on WhatsApp for Wayanad tour packages starting ₹4,000/person. We reply within 1 hour. Pickup from Kozhikode or Kalpetta.",
      keywords: "Wayanad contact, WhatsApp booking, Kozhikode pickup, wayanad trip planner",
      ogTitle: `${SITE.name} Contact`,
      ogDescription: "Enquire on WhatsApp for Wayanad packages. Reply within 1 hour."
    });
  }, []);

  const displayNumber = `+91 ${SITE.whatsapp.slice(2)}`;

  const whatsappHref = useMemo(() => {
    const msg = "Hi! I want to book a Wayanad trip with Wayanad Wild Ways.";
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, []);

  return (
    <main>
      <section className="relative h-[35svh] min-h-[260px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1600"
            alt="Wayanad forest"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(26,71,49,0.85) 100%)" }}
        />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="font-display font-bold text-white text-3xl sm:text-5xl">Contact</h1>
            <p className="mt-3 text-white/90 font-body text-sm sm:text-base">
              Send your travel dates and we will plan the best Wayanad trip for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-card bg-primary text-white shadow-card p-7 sm:p-9 leaf-texture">
              <div className="font-display text-2xl font-bold">Contact Details</div>
              <div className="mt-2 text-sm font-body text-white/90">We reply within 1 hour on WhatsApp</div>

              <div className="mt-6 space-y-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between gap-4 rounded-card bg-white/10 border border-white/15 p-4 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} />
                    <div>
                      <div className="text-xs font-body text-white/80">WhatsApp</div>
                      <div className="font-body font-semibold">{displayNumber}</div>
                    </div>
                  </div>
                  <div className="text-white/80 text-sm font-body">Tap</div>
                </a>

                <div className="rounded-card bg-white/10 border border-white/15 p-4">
                  <div className="text-xs font-body text-white/80">Pickup & Drop</div>
                  <div className="mt-1 font-body font-semibold">Kozhikode Railway Station / Kalpetta</div>
                </div>

                <div className="rounded-card bg-white/10 border border-white/15 p-4">
                  <div className="text-xs font-body text-white/80">Station</div>
                  <div className="mt-1 font-body font-semibold">Kozhikode</div>
                </div>

                <div className="rounded-card bg-white/10 border border-white/15 p-4">
                  <div className="text-xs font-body text-white/80">Instagram</div>
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" className="mt-1 block font-body font-semibold hover:underline">
                    @wayanad_wild_ways
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-pill bg-accent px-6 py-4 font-body font-semibold text-charcoal shadow-card-hover"
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="relative flex items-center justify-center rounded-full h-9 w-9 bg-charcoal/10">
                    <MessageCircle size={18} className="text-charcoal" />
                  </span>
                  Book on WhatsApp
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

