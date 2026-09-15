"use client";

import { QuizProvider } from "@/components/ui/QuizModal";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Prevented from "@/components/sections/Prevented";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Solutions from "@/components/sections/Solutions";
import Compare from "@/components/sections/Compare";
import Pricing from "@/components/sections/Pricing";
import Cases from "@/components/sections/Cases";
import Reviews from "@/components/sections/Reviews";
import Checklist from "@/components/sections/Checklist";
import FAQ from "@/components/sections/FAQ";
import Coverage from "@/components/sections/Coverage";
import Footer from "@/components/sections/Footer";
import MobileBar from "@/components/sections/MobileBar";

export default function Home() {
  return (
    <QuizProvider>
      <main className="min-h-screen">
        <Nav />
        <Hero />
        <TrustStrip />
        <Prevented />
        <Features />
        <HowItWorks />
        <Solutions />
        <Compare />
        <Pricing />
        <Cases />
        <Reviews />
        <Checklist />
        <FAQ />
        <Coverage />
        <Footer />
        <MobileBar />
      </main>
    </QuizProvider>
  );
}
