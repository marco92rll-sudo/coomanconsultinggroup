import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Differentiation from "@/components/landing/Differentiation";
import Problem from "@/components/landing/Problem";
import WhyOptionsFail from "@/components/landing/WhyOptionsFail";
import OurRole from "@/components/landing/OurRole";
import Solution from "@/components/landing/Solution";
import WhoThisIsFor from "@/components/landing/WhoThisIsFor";
import Outcomes from "@/components/landing/Outcomes";
import HowToStart from "@/components/landing/HowToStart";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Differentiation />
        <Problem />
        <WhyOptionsFail />
        <OurRole />
        <Solution />
        <WhoThisIsFor />
        <Outcomes />
        <HowToStart />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
