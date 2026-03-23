import React, { useMemo } from "react";
import { SITE } from "../../data/siteConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Packages", to: "/packages" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" }
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const displayNumber = `+91 ${SITE.whatsapp.slice(2)}`;

  const enquiryHref = useMemo(() => {
    const msg = "Hi! I want to enquire about a Wayanad Wild Ways trip.";
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, []);

  const onNav = (to) => {
    // Keep it simple: footer nav always routes.
    if (location.pathname !== to) navigate(to);
  };

  return (
    <footer className="relative bg-[#0d2b1e] text-white overflow-hidden">
      <div className="leaf-texture absolute inset-0 opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center font-display font-bold">
                WWW
              </div>
              <div>
                <div className="font-display text-xl font-semibold">{SITE.name}</div>
                <div className="font-accent text-base italic text-accent-light/90">{SITE.tagline}</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-white/80 font-body">
              Pickup: Kozhikode Railway Station or Kalpetta
              <br />
              Nearest station: Kozhikode
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="font-body font-semibold text-sm uppercase tracking-wide text-white/90">Navigation</div>
            <div className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => onNav(l.to)}
                  className="font-body text-sm text-white/85 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-body font-semibold text-sm uppercase tracking-wide text-white/90">Contact</div>
            <div className="mt-4 space-y-3 font-body text-sm text-white/85">
              <div>
                <span className="text-white/90 font-semibold">WhatsApp:</span> {displayNumber}
              </div>
              <div>
                <span className="text-white/90 font-semibold">Pickup:</span> Kozhikode / Kalpetta
              </div>
              <div>
                <span className="text-white/90 font-semibold">Station:</span> Kozhikode Railway Station
              </div>
              <div>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram: @wayanad_wild_ways
                </a>
              </div>
            </div>
          </div>

          <div className="sm:pt-2">
            <div className="font-body font-semibold text-sm uppercase tracking-wide text-white/90">Enquire on WhatsApp</div>
            <a
              href={enquiryHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-center rounded-pill bg-accent text-charcoal font-body font-semibold py-3 px-5 shadow-card-hover"
              style={{ touchAction: "manipulation" }}
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-sm text-white/80 font-body">
          © 2025 Wayanad Wild Ways. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

