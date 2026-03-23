import React, { useEffect, useMemo, useState } from "react";
import { PACKAGES } from "../data/packages";
import { SITE } from "../data/siteConfig";
import PackageCard from "../components/packages/PackageCard";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReveal } from "../animations/useReveal";

function setSEO({ title, description, keywords }) {
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
  setMetaByProperty("og:title", title);
  setMetaByProperty("og:description", description);
}

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="rounded-card border border-black/5 bg-white shadow-card">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="font-body font-semibold text-charcoal">{q}</div>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 text-sm font-body text-charcoal/70 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Packages() {
  useReveal();
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = useMemo(
    () => [
      {
        q: "What is the pickup location?",
        a: "We pick up from Kozhikode Railway Station or Kalpetta."
      },
      {
        q: "Are the prices per person?",
        a: "Yes, all prices are per person basis."
      },
      {
        q: "What type of accommodation is provided?",
        a: "We offer Couple Cottages, Bachelor Private Properties, and Budget-friendly options depending on your group type and preference."
      },
      {
        q: "Is food included?",
        a: "Yes — Breakfast, Lunch, and Dinner are included in both packages."
      },
      {
        q: "What is the best time to visit Wayanad?",
        a: "October to May is ideal. Monsoon (June–Sept) is beautiful but trekking may be limited."
      },
      {
        q: "Can I customise the package?",
        a: "Yes! Contact us on WhatsApp and we will plan a custom itinerary for you."
      }
    ],
    []
  );

  useEffect(() => {
    setSEO({
      title: `${SITE.name} | Best Wayanad Tour Packages from Kozhikode`,
      description:
        "Book Wayanad tour packages starting ₹4,000/person. 2 Day 1 Night & 3 Day 2 Night packages with accommodation, meals, private cab & all sightseeing from Kozhikode. Couple, bachelor & budget stays.",
      keywords:
        "wayanad tour packages, wayanad trip from kozhikode, wayanad 2 day 1 night package, wayanad 3 day 2 night package, wayanad couple package, wayanad budget tour, wayanad package planner, wayanad wild ways"
    });
  }, []);

  return (
    <main>
      <section className="relative h-[35svh] min-h-[260px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600"
            alt="Wayanad hills"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(26,71,49,0.78) 100%)" }}
        />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="font-display font-bold text-white text-3xl sm:text-5xl">Packages</h1>
            <p className="mt-3 text-white/90 font-body text-sm sm:text-base">
              Budget-friendly stays, private cabs, Kerala-style meals, and all sightseeing entries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}

          <div className="mt-4">
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal">FAQ</h2>
              <div className="mt-4 mx-auto w-28 h-1 rounded-pill bg-accent" />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4">
              {faqs.map((f, idx) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  open={idx === openFAQ}
                  onToggle={() => setOpenFAQ(idx === openFAQ ? -1 : idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

