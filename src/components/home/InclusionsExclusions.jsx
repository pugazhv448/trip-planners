import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const INCLUDED = [
  "Accommodation",
  "Private Cab",
  "All Meals",
  "Entry Tickets",
  "Pickup & Drop",
  "Welcome Drink",
  "Campfire Night"
];

const NOT_INCLUDED = [
  "Personal Shopping",
  "Optional Zipline (extra)",
  "900 Kandi Glass Bridge (extra)",
  "Other extras"
];

export default function InclusionsExclusions() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-card bg-primary p-7 text-white shadow-card" data-reveal>
            <div className="font-display text-2xl font-bold">What's Included</div>
            <div className="mt-5 space-y-3">
              {INCLUDED.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5" size={18} />
                  <div className="font-body text-sm leading-relaxed text-white/90">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card bg-white p-7 shadow-card border border-black/5" data-reveal>
            <div className="font-display text-2xl font-bold text-charcoal">What's Not Included</div>
            <div className="mt-5 space-y-3">
              {NOT_INCLUDED.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 text-accent" size={18} />
                  <div className="font-body text-sm leading-relaxed text-charcoal/80">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

