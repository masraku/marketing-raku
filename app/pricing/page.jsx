import PricingSection from "@/components/sections/PricingSection";

export const metadata = {
  title: "Harga Jasa Pembuatan Website | Mulai Dari Rp2 Juta",
  description:
    "Paket harga pembuatan website profesional untuk UMKM & Perusahaan. Mulai dari Rp2 juta, sudah termasuk hosting, domain, SSL, dan maintenance bulanan.",
  keywords: [
    "harga jasa pembuatan website",
    "biaya buat website",
    "harga bikin website company profile",
    "paket website murah",
    "jasa web murah berkualitas",
    "harga jasa web developer",
  ],
  openGraph: {
    title: "Harga Jasa Pembuatan Website | Mulai Dari Rp2 Juta",
    description:
      "Mulai dari Rp2 juta. Termasuk hosting, domain, SSL, dan maintenance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harga Jasa Pembuatan Website | Mulai Dari Rp2 Juta",
    description:
      "Mulai dari Rp2 juta. Termasuk hosting, domain, SSL, dan maintenance.",
  },
};

export default function PricingPage() {
  return (
    <main className="pt-24">
      <PricingSection />
    </main>
  );
}
