import React, { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MagneticButton from "../ui/MagneticButton";
import { SITE } from "../../data/siteConfig";
import { useSmoothScrollContext } from "../ui/SmoothScrollProvider";

const NAV_LINKS = [
  { label: "Home", key: "home", to: "/" },
  { label: "About", key: "about", to: "/about" },
  { label: "Packages", key: "packages", to: "/packages" },
  { label: "Gallery", key: "gallery", to: "/gallery" },
  { label: "Contact", key: "contact", to: "/contact" }
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScrollContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // Switch text to dark once user scrolls past ~85% of viewport height
      setHeroVisible(y < window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const whatsappHref = useMemo(() => {
    const msg = "Hi! I want to book the Wild Escape / Deep Wild packages.";
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, []);

  const isHome = location.pathname === "/";

  const onNavClick = (key, to) => {
    if (key === "home") {
      if (!isHome) navigate(to);
      else scrollTo(0, { offset: 0 });
      return;
    }

    const scrollTargets = {
      about: "#about",
      packages: "#packages",
      gallery: "#gallery",
      contact: "#contact"
    };

    if (isHome && scrollTargets[key]) {
      scrollTo(scrollTargets[key], { offset: 86 });
      return;
    }

    navigate(to);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 w-full z-[999] transition-colors duration-300",
          scrolled ? "bg-white/85 backdrop-blur border-b border-black/5" : "bg-transparent"
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              type="button"
              onClick={() => (isHome ? scrollTo(0, { offset: 0 }) : navigate("/"))}
              className="flex items-center gap-3"
              aria-label="Go to Home"
            >
              <div
                className={[
                  "h-10 w-10 rounded-xl flex items-center justify-center font-display font-bold",
                  scrolled ? "bg-primary text-white" : "bg-transparent border border-white/30 text-white"
                ].join(" ")}
              >
                WWW
              </div>
              <div className="hidden sm:block">
                <div className={scrolled ? "text-primary font-display text-lg font-semibold" : "text-white font-display text-lg font-semibold"}>
                  {SITE.name}
                </div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onNavClick(item.key, item.to)}
                  className={[
                    "font-body text-sm font-bold transition-colors",
                    heroVisible
                      ? "text-white hover:text-white/70"
                      : "text-black hover:text-primary"
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
              <MagneticButton
                className="h-11 px-5 rounded-pill bg-primary text-white font-body font-semibold text-sm shadow-card-hover"
                onClick={() => window.open(whatsappHref, "_blank", "noreferrer")}
              >
                Book on WhatsApp
              </MagneticButton>
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                aria-label="Open menu"
                className={["h-11 w-11 flex items-center justify-center rounded-xl border", scrolled ? "border-black/10 bg-white/60 text-primary" : "border-white/20 bg-white/10 text-white"].join(" ")}
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[1001] md:hidden">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
          <div className="relative h-full">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-display font-bold">
                  WWW
                </div>
                <div>
                  <div className="text-primary font-display text-lg font-semibold">{SITE.name}</div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                className="h-11 w-11 rounded-xl border border-black/10 bg-white flex items-center justify-center text-primary"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-4 pb-6">
              <div className="mt-8 flex flex-col gap-4">
                {NAV_LINKS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onNavClick(item.key, item.to);
                    }}
                    className="text-left font-body text-base font-semibold text-charcoal/90"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton
                  className="w-full h-12 rounded-pill bg-primary text-white font-body font-semibold text-sm shadow-card-hover"
                  onClick={() => window.open(whatsappHref, "_blank", "noreferrer")}
                >
                  Book on WhatsApp
                </MagneticButton>
                <div className="mt-3 text-sm text-charcoal/70 font-body">
                  Pickup: Kozhikode Railway Station or Kalpetta
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

