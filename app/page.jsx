import Hero from "@/components/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <PricingSection />
      <ShowcaseSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
