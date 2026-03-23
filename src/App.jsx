import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PageTransitionWrapper from "./components/ui/PageTransitionWrapper";
import SmoothScrollProvider from "./components/ui/SmoothScrollProvider";
import CustomCursor from "./components/ui/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppFAB from "./components/ui/WhatsAppFAB";
import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import ScrollTrigger from "gsap/ScrollTrigger";

function ScrollTriggerRefresh() {
  const location = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // no-op
      }
    });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <Navbar />
        <CustomCursor />
        <ScrollTriggerRefresh />
        <PageTransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </PageTransitionWrapper>
        <Footer />
        <WhatsAppFAB />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

