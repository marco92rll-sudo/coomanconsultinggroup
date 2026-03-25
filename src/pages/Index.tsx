import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import IndustriesStrip from "@/components/landing/IndustriesStrip";
import WhatWeDo from "@/components/landing/WhatWeDo";
import OurProcess from "@/components/landing/OurProcess";
import GetStarted from "@/components/landing/GetStarted";
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
        <WhatWeDo />
        <div className="glow-line relative z-10" />
        <OurProcess />
        <div className="glow-line relative z-10" />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
