import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { SITE } from "../../data/siteConfig";
import { PACKAGES } from "../../data/packages";

function whatsappForPackage(pkg) {
  const msg = `Hi! I'm interested in the ${pkg.name} package.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export default function PackageHighlight() {
  const navigate = useNavigate();

  const pkgCards = useMemo(() => {
    return [PACKAGES[0], PACKAGES[1]];
  }, []);

  const onViewDetails = () => {
    navigate("/packages");
  };

  return (
    <section id="packages" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-reveal>
          <div className="inline-flex items-center gap-3">
            <h2 className="font-display text-3xl sm:text-5xl text-charcoal font-bold">
              Our Travel Packages
            </h2>
          </div>
          <div className="mt-4 mx-auto w-40 h-1 rounded-pill bg-accent" />
          <div className="mt-4 text-sm sm:text-base font-body text-charcoal/70">
            Simple, transparent, budget-friendly
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pkgCards.map((pkg) => {
            const ctaHref = whatsappForPackage(pkg);
            const keyInclusions = pkg.inclusions.slice(0, 4);

            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-card border border-black/5 shadow-card-hover transition-transform duration-300 hover:-translate-y-2 hover:shadow-card"
                data-reveal
              >
                <div className="relative overflow-hidden rounded-card">
                  <img src={pkg.heroImage} alt={pkg.name} className="h-56 sm:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(26,71,49,0.75) 100%)" }} />
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center rounded-pill bg-accent-light text-charcoal px-4 py-2 font-body text-xs sm:text-sm font-semibold">
                      {pkg.badge}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-body text-sm text-primary-light font-semibold">{pkg.subtitle}</div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">{pkg.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl sm:text-3xl text-primary font-bold">{pkg.priceLabel}</div>
                    </div>
                  </div>

                  <div className="mt-4 text-charcoal/70 font-body text-sm">
                    Limited availability for this season
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-2">
                    {keyInclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check size={14} />
                        </span>
                        <div className="text-charcoal/80 font-body text-sm leading-relaxed">{inc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <MagneticButton
                      className="h-12 sm:h-11 px-5 rounded-pill bg-transparent border border-primary text-primary font-body font-semibold text-sm shadow-card"
                      onClick={onViewDetails}
                    >
                      View Details
                    </MagneticButton>

                    <MagneticButton
                      className="h-12 sm:h-11 px-5 rounded-pill bg-primary text-white font-body font-semibold text-sm shadow-card-hover"
                      onClick={() => window.open(ctaHref, "_blank", "noreferrer")}
                    >
                      Book on WhatsApp
                    </MagneticButton>
                  </div>

                  <div className="mt-4 text-xs text-charcoal/60 font-body">
                    Private cab — not shared | Safe, vetted stays | No hidden charges | Kerala-style authentic meals
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

