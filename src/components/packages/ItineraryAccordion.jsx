import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ItineraryAccordion({ itinerary = [] }) {
  const days = useMemo(() => itinerary, [itinerary]);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-5 space-y-3">
      {days.map((day, idx) => {
        const open = idx === openIndex;
        return (
          <div key={day.day} className="border border-black/5 rounded-card bg-white">
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              aria-expanded={open}
            >
              <div>
                <div className="font-body font-semibold text-charcoal">
                  Day {day.day}: {day.title}
                </div>
              </div>
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
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-4 pb-4">
                    <ul className="mt-2 space-y-2">
                      {day.activities.map((a, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 h-2 w-2 rounded-full bg-accent" />
                          <span className="font-body text-sm text-charcoal/80 leading-relaxed">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

