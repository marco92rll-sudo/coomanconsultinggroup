import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import IndustriesStrip from "@/components/landing/IndustriesStrip";

import OurProcess from "@/components/landing/OurProcess";
import PolarizingStatement from "@/components/landing/PolarizingStatement";
import WhoThisIsFor from "@/components/landing/WhoThisIsFor";
import ValuePillars from "@/components/landing/ValuePillars";
import FAQ from "@/components/landing/FAQ";
import GetStarted from "@/components/landing/GetStarted";
import Testimonials from "@/components/landing/Testimonials";

import RiskReversal from "@/components/landing/RiskReversal";
import Footer from "@/components/landing/Footer";
import MorphingOrbs from "@/components/landing/MorphingOrbs";

const Index = () => {
  return (
    <div className="min-h-screen relative" style={{ background: "#090f1a" }}>
      <MorphingOrbs />
      <Header />
      <main>
        <Hero />
        <IndustriesStrip />


        <OurProcess />
        <div className="glow-line relative z-10" />
        <PolarizingStatement />
        <div className="glow-line relative z-10" />
        <WhoThisIsFor />
        <div className="glow-line relative z-10" />
        <ValuePillars />
        <div className="glow-line relative z-10" />
        <RiskReversal />
        <div className="glow-line relative z-10" />
        <Testimonials />
        <div className="glow-line relative z-10" />
        <GetStarted />


        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
