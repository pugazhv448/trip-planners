import React from "react";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function StatsBar() {
  return (
    <section className="bg-primary text-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          <div className="lg:border-r lg:border-white/15 pr-2 lg:pr-8">
            <AnimatedCounter value={500} suffix="+" label="Happy Travelers" />
          </div>
          <div className="lg:border-r lg:border-white/15 pr-2 lg:pr-8">
            <AnimatedCounter value={2} label="Premium Packages" />
          </div>
          <div className="lg:border-r lg:border-white/15 pr-2 lg:pr-8">
            <AnimatedCounter value={15} suffix="+" label="Sightseeing Spots" />
          </div>
          <div>
            <AnimatedCounter value={24} suffix="/7" label="WhatsApp Support" />
          </div>
        </div>
      </div>
    </section>
  );
}

