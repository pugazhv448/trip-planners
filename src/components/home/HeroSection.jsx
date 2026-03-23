import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { SITE } from "../../data/siteConfig";
import { useSmoothScrollContext } from "../ui/SmoothScrollProvider";
import { usePrefersReducedMotion } from "../../animations/deviceConfig";
import { useParallax } from "../../animations/useParallax";
import ParallaxImage from "../ui/ParallaxImage";
import { usePerformanceMonitor } from "../../animations/usePerformanceMonitor";

const HERO_SLIDES = [
  {
    id: "h1",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600",
    alt: "Wayanad forest and hills"
  },
  {
    id: "h2",
    src: "https://images.unsplash.com/photo-1500043357865-c6b853a0b23b?w=1600",
    alt: "Misty waterfall in Kerala"
  },
  {
    id: "h3",
    src: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=1600",
    alt: "Tea plantation landscape"
  },
  {
    id: "h4",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600",
    alt: "Lake and greenery"
  }
];

export default function HeroSection() {
  const { scrollTo } = useSmoothScrollContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { allowHeavyMotion } = usePerformanceMonitor();
  useParallax();

  const [active, setActive] = useState(0);
  const imgWrapRef = useRef(null);
  const tweenRef = useRef(null);

  const whatsappHref = useMemo(() => {
    const msg = "Hi! I want to book the Wild Escape / Deep Wild packages.";
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !allowHeavyMotion) return;
    const interval = window.setInterval(() => {
      setActive((v) => (v + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, allowHeavyMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !allowHeavyMotion) {
      tweenRef.current?.kill();
      return;
    }
    if (!imgWrapRef.current) return;

    tweenRef.current?.kill();
    const el = imgWrapRef.current;
    gsap.set(el, { transformOrigin: "center center" });
    tweenRef.current = gsap.fromTo(
      el,
      { scale: 1.08 },
      { scale: 1.18, duration: 4, ease: "power1.out" }
    );

    return () => {
      tweenRef.current?.kill();
    };
  }, [active, prefersReducedMotion, allowHeavyMotion]);

  const onViewPackages = () => {
    scrollTo("#packages", { offset: 86 });
  };

  return (
    <section className="relative vh100 leaf-texture">
      {/* Background slide */}
      {HERO_SLIDES.map((s, idx) => {
        const isActive = idx === active;
        return (
          <div
            key={s.id}
            className={[
              "absolute inset-0 transition-opacity duration-500",
              isActive ? "opacity-100" : "opacity-0"
            ].join(" ")}
            aria-hidden={!isActive}
          >
              <ParallaxImage className="absolute inset-0" speed={0.1}>
                <div ref={isActive ? imgWrapRef : null} className="absolute inset-0">
                  <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
                </div>
              </ParallaxImage>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(26,71,49,0.6) 100%)"
                }}
              />
            </div>
        );
      })}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full pb-20 sm:pb-24 text-center">
          <div className="inline-flex items-center gap-3 rounded-pill bg-white/5 border border-white/10 px-4 py-2 mb-6">
            <span className="font-accent italic text-accent-light text-lg">Welcome to Wayanad</span>
            <span className="h-1 w-1 rounded-full bg-accent-light/80 hidden sm:block" />
          </div>

          <h1 className="font-display font-bold text-white text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
            Explore Wayanad with Comfort, Adventure & Best Budget Packages
          </h1>

          <p className="mt-5 text-white/90 font-body text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
            Handpicked Wayanad experiences with cozy stays, scenic sightseeing, Kerala-style meals, and hassle-free pickup
            from Kozhikode or Kalpetta.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <MagneticButton
              className="h-12 sm:h-11 px-6 rounded-pill bg-primary text-white font-body font-semibold text-sm sm:text-base shadow-card-hover"
              onClick={() => window.open(whatsappHref, "_blank", "noreferrer")}
            >
              Book on WhatsApp
            </MagneticButton>

            <MagneticButton
              className="h-12 sm:h-11 px-6 rounded-pill bg-transparent border border-white/70 text-white font-body font-semibold text-sm sm:text-base"
              onClick={onViewPackages}
            >
              View Packages
            </MagneticButton>
          </div>

          <div className="mt-4 text-accent-light font-body font-semibold text-sm sm:text-base">
            🌿 Limited slots — Book your dates now
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => scrollTo("#packages", { offset: 86 })}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-1 text-white/90"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
        <span className="text-xs font-body hidden sm:block">Scroll</span>
      </button>

      {/* Carousel dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {HERO_SLIDES.map((s, idx) => {
          const activeDot = idx === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                activeDot ? "w-8 bg-accent-light" : "w-2.5 bg-white/40 hover:bg-white/70"
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}

