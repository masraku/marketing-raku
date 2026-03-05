import ServicesSection from "@/components/sections/ServicesSection";

export const metadata = {
  title: "Layanan Jasa Pembuatan Website by Rakuuu",
  description:
    "Layanan jasa pembuatan website profesional: Bikin web Landing Page, Company Profile, Web Application Custom, dan Web E-Commerce Toko Online.",
  keywords: [
    "layanan pembuatan website",
    "jasa bikin web landing page",
    "jasa pembuatan company profile",
    "jasa web application custom",
    "jasa bikin website toko online e-commerce",
    "jasa web developer profesional",
  ],
  openGraph: {
    title: "Layanan Jasa Pembuatan Website by Rakuuu",
    description:
      "Bikin Landing Page, Company Profile, Web App custom impian Anda bersama Rakuuu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Jasa Pembuatan Website by Rakuuu",
    description:
      "Bikin Landing Page, Company Profile, Web App custom impian Anda bersama Rakuuu.",
  },
};

export default function ServicesPage() {
  return (
    <main className="pt-24">
      <ServicesSection />
    </main>
  );
}
