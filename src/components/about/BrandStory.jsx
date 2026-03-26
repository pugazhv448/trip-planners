import React, { useMemo } from "react";
import { Users, ShieldCheck, Receipt, MessageCircleMore, Home, Building2, Wallet } from "lucide-react";
import { SITE } from "../../data/siteConfig";

export default function BrandStory() {
  const whatsappHref = useMemo(() => {
    const msg = "Hi! I want to plan my trip to Wayanad with Wayanad Wild Ways.";
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, []);

  return (
    <section id="about" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-reveal>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal">We Are Wayanad Wild Ways</h2>
          <div className="mt-4 mx-auto w-44 h-1 rounded-pill bg-accent" />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="rounded-card pseudo-border bg-white shadow-card p-7 sm:p-9" data-reveal>
              <div className="font-body text-sm text-primary-light font-semibold uppercase tracking-wide">
                Local operator for real wilderness comfort
              </div>

              <div className="mt-5 font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                <p>
                  Born from a love for Wayanad's untouched forests and misty highlands, Wayanad Wild Ways is a
                  local travel operator dedicated to giving every traveler an authentic, comfortable, and
                  unforgettable experience in God's own wilderness.
                </p>
                <p className="mt-4">
                  We believe great travel doesn't have to be expensive. Our mission is to make Wayanad accessible
                  to every couple, family, bachelor group, and solo explorer — with honest pricing, clean stays,
                  private transport, and real Kerala hospitality.
                </p>
                <p className="mt-4">
                  Every package we plan is personally curated. From the moment you step off the train at Kozhikode
                  to the final campfire night under the Wayanad stars — we are with you every step.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: Users,
                title: "Local Experts",
                desc: "We know every hidden trail, waterfall, and viewpoint"
              },
              {
                icon: ShieldCheck,
                title: "Private & Safe",
                desc: "Private cabs, vetted properties, always secure"
              },
              {
                icon: Receipt,
                title: "Budget-Honest",
                desc: "No hidden charges. What you see is what you pay"
              },
              {
                icon: MessageCircleMore,
                title: "24/7 Support",
                desc: "WhatsApp us anytime before, during, or after your trip"
              }
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-card pseudo-border shadow-card p-5" data-reveal>
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-body font-semibold text-charcoal">{p.title}</div>
                      <div className="mt-2 text-sm font-body text-charcoal/70 leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <div className="text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">Stay Options</h3>
            <div className="mt-3 mx-auto w-24 h-1 rounded-pill bg-accent" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "🏡 Couple Cottage", desc: "Private, romantic, perfect for 2", icon: Home },
              { title: "🏘️ Bachelor Property", desc: "Group-friendly, private, fun-ready", icon: Building2 },
              { title: "💰 Budget Property", desc: "Comfortable, clean, pocket-friendly", icon: Wallet }
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-card pseudo-border shadow-card p-6 text-center" data-reveal>
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div className="mt-4 font-body font-semibold text-charcoal">{p.title}</div>
                  <div className="mt-2 font-body text-sm text-charcoal/70 leading-relaxed">{p.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center" data-reveal>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-primary text-white font-body font-semibold py-3 px-6 shadow-card-hover"
              style={{ touchAction: "manipulation" }}
            >
              Plan Your Trip With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

