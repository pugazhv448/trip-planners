import React, { useMemo } from "react";
import { Phone } from "lucide-react";
import { SITE } from "../../data/siteConfig";

export default function WhatsAppBanner() {
  const whatsappHref = useMemo(() => {
    const msg = "Hi! I want to book the Wild Escape / Deep Wild packages.";
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, []);

  const displayNumber = `+91 ${SITE.whatsapp.slice(2)}`;

  return (
    <section id="contact" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-card overflow-hidden border border-white/10"
          data-reveal
          style={{
            background: "linear-gradient(180deg, rgba(26,71,49,1) 0%, rgba(13,43,30,1) 100%)"
          }}
        >
          <div className="absolute inset-0 opacity-20 leaf-texture pointer-events-none" />

          <div className="relative p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-accent text-accent-light italic text-xl sm:text-2xl">Ready to Explore Wayanad?</div>
              <div className="mt-3 text-white font-display text-3xl sm:text-5xl font-bold leading-tight">
                We plan your trip, you just enjoy the wild.
              </div>
              <div className="mt-3 text-white/85 font-body text-sm sm:text-base max-w-xl">
                Message us on WhatsApp and we'll plan your perfect trip.
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-3 rounded-pill bg-accent px-6 py-4 font-body font-semibold text-charcoal shadow-card-hover"
                style={{ touchAction: "manipulation" }}
              >
                <span className="absolute -inset-3 rounded-full animate-ping bg-accent/25" />
                <Phone size={18} />
                <span className="text-sm sm:text-base">WhatsApp</span>
                <span className="hidden sm:inline text-charcoal/90 font-semibold">{displayNumber}</span>
              </a>

              <div className="text-white/80 font-body text-xs sm:text-sm">
                Limited slots fill fast. Tap to book now.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

