import React, { useMemo, useState } from "react";
import MagneticButton from "../ui/MagneticButton";
import ItineraryAccordion from "./ItineraryAccordion";
import { CheckCircle2, XCircle } from "lucide-react";
import { SITE } from "../../data/siteConfig";

const PROPERTY_OPTIONS = ["Couple Cottage", "Bachelor Property", "Budget Stay"];

function whatsappForPackage(pkgName) {
  const msg = `Hi! I'm interested in the ${pkgName} package.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export default function PackageCard({ pkg }) {
  const [property, setProperty] = useState(PROPERTY_OPTIONS[0]);

  const propertyLabel = useMemo(() => property, [property]);

  const ctaHref = useMemo(() => whatsappForPackage(pkg.name), [pkg.name]);

  return (
    <div
      className="bg-white rounded-card border border-black/5 shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
      data-reveal
    >
      <div className="relative">
        <img src={pkg.heroImage} alt={pkg.name} className="h-56 sm:h-64 w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(26,71,49,0.85) 100%)" }} />
        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center rounded-pill bg-accent-light px-4 py-2 text-charcoal font-body text-xs sm:text-sm font-semibold">
            {pkg.badge}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="font-body text-white/90 text-sm font-semibold">{pkg.subtitle}</div>
              <div className="font-display text-white text-3xl sm:text-4xl font-bold leading-tight">{pkg.name}</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-display text-white text-2xl sm:text-3xl font-bold">{pkg.priceLabel}</div>
              <div className="mt-1 text-white/90 font-body text-sm">Limited availability for this season</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {pkg.bestFor.map((t) => (
            <span key={t} className="px-3 py-1 rounded-pill border border-black/10 text-charcoal/80 font-body text-xs font-semibold">
              {t}
            </span>
          ))}
        </div>

        <ItineraryAccordion itinerary={pkg.itinerary} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-card bg-primary/5 border border-primary/10 p-5">
            <div className="font-display text-xl font-bold text-primary">What's Included</div>
            <ul className="mt-4 space-y-3">
              {pkg.inclusions.map((inc) => (
                <li key={inc} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-0.5" size={18} />
                  <span className="font-body text-sm text-charcoal/80 leading-relaxed">{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card bg-accent/5 border border-accent/15 p-5">
            <div className="font-display text-xl font-bold text-accent">What's Not Included</div>
            <ul className="mt-4 space-y-3">
              {pkg.exclusions.map((exc) => (
                <li key={exc} className="flex items-start gap-3">
                  <XCircle className="text-accent mt-0.5" size={18} />
                  <span className="font-body text-sm text-charcoal/80 leading-relaxed">{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <div className="font-body font-semibold text-charcoal">Choose Property Type</div>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            {PROPERTY_OPTIONS.map((opt) => {
              const active = opt === property;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setProperty(opt)}
                  className={[
                    "flex-1 h-11 rounded-pill border font-body font-semibold text-sm transition-colors",
                    active ? "bg-primary text-white border-primary" : "bg-white border-black/10 text-charcoal/80 hover:border-primary/30"
                  ].join(" ")}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="mt-3 text-sm font-body text-charcoal/60">
            Selected: {propertyLabel}
          </div>
        </div>

        <div className="mt-4 text-xs text-charcoal/60 font-body">
          Private cab — not shared | Safe, vetted stays | No hidden charges | Kerala-style authentic meals
        </div>

        <div className="mt-6">
          <MagneticButton
            className="h-12 px-6 rounded-pill bg-primary text-white font-body font-semibold text-sm shadow-card-hover flex-1"
            onClick={() => window.open(ctaHref, "_blank", "noreferrer")}
          >
            Book Package on WhatsApp
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

