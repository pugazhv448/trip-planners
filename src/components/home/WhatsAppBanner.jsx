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

          <div className="relative p-8 sm:p-12 cta-section-flex">
            <div className="text-left">
              <div className="font-accent text-accent-light italic text-xl sm:text-2xl">Ready to Explore Wayanad?</div>
              <div className="mt-4 text-white font-display text-3xl sm:text-6xl font-bold leading-[1.1] max-w-2xl">
                We plan your trip, you just enjoy the wild.
              </div>
              <div className="mt-6 text-white/70 font-body text-base sm:text-lg max-w-xl leading-relaxed">
                Message us on WhatsApp and we'll plan your perfect trip. Limited slots available for this season.
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 font-body font-bold text-charcoal shadow-2xl hover:bg-accent-light transition-all white-space-nowrap min-w-max"
                style={{ touchAction: "manipulation" }}
              >
                <span className="absolute -inset-2 rounded-full animate-ping bg-accent/20" />
                <Phone size={20} fill="currentColor" />
                <span className="text-base sm:text-lg">WhatsApp {displayNumber}</span>
              </a>

              <div className="text-white/50 font-body text-sm font-medium">
                🌿 Real-time support | Instant booking confirmation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

