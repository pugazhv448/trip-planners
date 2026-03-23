import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsBar from "../components/home/StatsBar";
import PackageHighlight from "../components/home/PackageHighlight";
import WhyChooseUs from "../components/home/WhyChooseUs";
import SightseeinHighlights from "../components/home/SightseeinHighlights";
import InclusionsExclusions from "../components/home/InclusionsExclusions";
import Testimonials from "../components/home/Testimonials";
import GalleryPreview from "../components/home/GalleryPreview";
import WhatsAppBanner from "../components/home/WhatsAppBanner";
import BrandStory from "../components/about/BrandStory";
import { useReveal } from "../animations/useReveal";

export default function Home() {
  useReveal();
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PackageHighlight />
      <WhyChooseUs />
      <SightseeinHighlights />
      <InclusionsExclusions />
      <Testimonials />
      <GalleryPreview />
      <BrandStory />
      <WhatsAppBanner />
    </main>
  );
}

