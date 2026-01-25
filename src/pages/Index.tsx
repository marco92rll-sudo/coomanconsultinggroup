import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import AgencyTrap from "@/components/landing/AgencyTrap";
import HowWeWork from "@/components/landing/HowWeWork";
import WhoWeWorkWith from "@/components/landing/WhoWeWorkWith";
import Deliverables from "@/components/landing/Deliverables";
import CaseStudies from "@/components/landing/CaseStudies";
import Manifesto from "@/components/landing/Manifesto";
import Pricing from "@/components/landing/Pricing";
import PipelineAudit from "@/components/landing/PipelineAudit";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AgencyTrap />
        <HowWeWork />
        <WhoWeWorkWith />
        <Deliverables />
        <CaseStudies />
        <Manifesto />
        <Pricing />
        <PipelineAudit />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
