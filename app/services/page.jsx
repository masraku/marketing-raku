import ServicesSection from "@/components/sections/ServicesSection";

export const metadata = {
  title: "Layanan jasa bikin website by Rakuuu",
  description:
    "Layanan pembuatan website profesional: Landing Page, Company Profile, Web Application, E-Commerce, dan Ekosistem Digital.",
  keywords: [
    "jasa buat website",
    "landing page UMKM",
    "company profile",
    "web application",
    "e-commerce",
    "web developer Indonesia",
  ],
  openGraph: {
    title: "Layanan — Jasa Buat Website by Rakuuu",
    description:
      "Landing Page, Company Profile, Web App, E-Commerce — semua custom dan profesional.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan — Jasa Buat Website by Rakuuu",
    description:
      "Landing Page, Company Profile, Web App, E-Commerce — semua custom dan profesional.",
  },
};

export default function ServicesPage() {
  return (
    <main className="pt-24">
      <ServicesSection />
    </main>
  );
}
