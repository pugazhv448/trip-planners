import React from "react";
import { ShieldCheck, Truck, UtensilsCrossed, Landmark, PhoneCall, Flame } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    tone: "primary",
    title: "Private Cab Only",
    desc: "Your own vehicle, no shared taxis"
  },
  {
    icon: ShieldCheck,
    tone: "accent",
    title: "Safe & Clean Stays",
    desc: "Vetted cottages for couples & groups"
  },
  {
    icon: UtensilsCrossed,
    tone: "primary",
    title: "Kerala-Style Meals",
    desc: "Authentic home-cooked taste"
  },
  {
    icon: Landmark,
    tone: "accent",
    title: "Budget-Friendly",
    desc: "Premium experience at honest prices"
  },
  {
    icon: PhoneCall,
    tone: "primary",
    title: "Station Pickup",
    desc: "Hassle-free Kozhikode pickup & drop"
  },
  {
    icon: Flame,
    tone: "accent",
    title: "Campfire Nights",
    desc: "Live music, bonfire, nature evenings"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-reveal>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal">Why Choose Us</h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-pill bg-accent" />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, idx) => {
            const Icon = f.icon;
            const isAccent = f.tone === "accent";
            return (
              <div key={idx} className="bg-white rounded-card border border-black/5 shadow-card p-6" data-reveal>
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      isAccent ? "bg-accent-light/20 text-accent" : "bg-primary/10 text-primary"
                    ].join(" ")}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-body text-lg font-semibold text-charcoal">{f.title}</div>
                    <div className="mt-2 text-charcoal/70 font-body text-sm leading-relaxed">{f.desc}</div>
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

