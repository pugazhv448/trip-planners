import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { SITE } from "../../data/siteConfig";
import { useSmoothScrollContext } from "../ui/SmoothScrollProvider";

const heroImages = [
  "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1920&q=90&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=90&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=90&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90&fit=crop&crop=center",
];

const SLIDE_DURATION = 5000; // ms per slide
const FADE_DURATION  = 1.4;  // seconds for GSAP crossfade

export default function HeroSection() {
  const contentRef  = useRef(null);
  const layersRef   = useRef([]);
  const intervalRef = useRef(null);
  const [current, setCurrent]   = useState(0);
  const [isReady, setIsReady]   = useState(false);
  const { scrollTo } = useSmoothScrollContext();

  const whatsappHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hi! I want to book the Wild Escape / Deep Wild packages."
  )}`;

  // ── Preload images then mark ready ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      heroImages.map(
        (url) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = img.onerror = res;
            img.src = url;
          })
      )
    ).then(() => {
      if (!cancelled) setIsReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  // ── Entrance animation (text) ────────────────────────────────────────────
  useEffect(() => {
    if (!isReady || !contentRef.current) return;
    const children = Array.from(contentRef.current.children);
    gsap.fromTo(
      children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, [isReady]);

  // ── Auto-rotate slides (GSAP crossfade) ─────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const advance = () => {
      setCurrent((prev) => {
        const next = (prev + 1) % heroImages.length;

        const outLayer = layersRef.current[prev];
        const inLayer  = layersRef.current[next];
        if (!outLayer || !inLayer) return next;

        // Simultaneous crossfade — NO z-index changes.
        // This prevents the gradient overlay (::after z-index:1) from
        // being obscured, which was causing the dim/bright glitch.
        gsap.to(outLayer, {
          opacity: 0,
          duration: FADE_DURATION,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          inLayer,
          { opacity: 0 },
          { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" }
        );

        return next;
      });
    };

    intervalRef.current = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(intervalRef.current);
  }, [isReady]);

  const handleScrollDown = () => scrollTo("#stats", { offset: 0 });

  return (
    <section
      id="hero"
      className="hero-section bg-black"
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      {/* ── Image layers ── */}
      <div className="hero-image-stack">
        {heroImages.map((src, i) => (
          <div
            key={i}
            ref={(el) => (layersRef.current[i] = el)}
            className="hero-img-layer"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* ── Cinematic grain & gradient overlay ── */}
      <div className="hero-grain-overlay" />

      {/* ── Content ── */}
      <div className="hero-content relative z-10 w-full h-full flex items-center justify-center px-4">
        <div ref={contentRef} className="hero-content-inner w-full max-w-4xl text-center">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8">
            <span className="text-accent-light text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Premium Tourism Experience
            </span>
          </div>

          <h1 className="hero-title mb-8">
            Explore Wayanad <br className="hidden sm:block" /> with Wild Ways
          </h1>

          <p className="hero-subtitle text-xl sm:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            A cinematic escape into the heart of nature. Handpicked stays, sacred
            trails, and authentic Kerala soul.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton
              className="w-full sm:w-auto h-16 px-10 rounded-full bg-white text-black font-bold text-lg shadow-2xl hover:bg-neutral-100! transition-none"
              onClick={() => window.open(whatsappHref, "_blank", "noreferrer")}
            >
              Book on WhatsApp
            </MagneticButton>

            <MagneticButton
              className="w-full sm:w-auto h-16 px-10 rounded-full bg-transparent border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10! transition-none backdrop-blur-sm"
              onClick={() => scrollTo("#packages", { offset: 86 })}
            >
              View Packages
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={handleScrollDown}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          Discover
        </span>
        <ChevronDown size={32} className="animate-bounce" />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-10 right-8 z-20 flex flex-col gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearInterval(intervalRef.current);
              const outLayer = layersRef.current[current];
              const inLayer  = layersRef.current[i];
              if (outLayer && inLayer && i !== current) {
                gsap.set(inLayer,  { zIndex: 2, opacity: 0 });
                gsap.to(inLayer,   { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut",
                  onComplete: () => {
                    gsap.set(outLayer, { opacity: 0, zIndex: 0 });
                    gsap.set(inLayer,  { zIndex: 1 });
                  }
                });
                gsap.set(outLayer, { zIndex: 1 });
              }
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 8,
              height: i === current ? 24 : 8,
              borderRadius: 4,
              background: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "height 0.3s ease, background 0.3s ease",
              display: "block",
            }}
          />
        ))}
      </div>
    </section>
  );
}
