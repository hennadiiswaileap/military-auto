import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CarExamples from "@/components/CarExamples";
import TrustBlock from "@/components/TrustBlock";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CarExamples />
        <TrustBlock />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
