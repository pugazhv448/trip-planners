import React, { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SITE } from "../../data/siteConfig";

export default function WhatsAppFAB() {
  const location = useLocation();

  const isHidden = location.pathname === "/contact";

  const href = useMemo(() => {
    const msg = "Hi! I want to book the Wild Escape / Deep Wild packages.";
    const text = encodeURIComponent(msg);
    return `https://wa.me/${SITE.whatsapp}?text=${text}`;
  }, []);

  if (isHidden) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-[999] h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
      aria-label="Chat on WhatsApp"
      style={{ touchAction: "manipulation" }}
    >
      <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
      <span className="relative flex items-center justify-center text-white">
        <MessageCircle size={22} />
      </span>
    </a>
  );
}

