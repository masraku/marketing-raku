import PricingSection from "@/components/sections/PricingSection";

export const metadata = {
  title: "Paket Harga — Jasa Buat Website by Rakuuu",
  description:
    "Paket layanan pembuatan website untuk UMKM. Mulai dari Rp2 juta. Termasuk hosting, domain, dan maintenance.",
  keywords: [
    "harga jasa buat website",
    "paket website murah",
    "harga landing page",
    "biaya buat website",
    "jasa website UMKM",
  ],
  openGraph: {
    title: "Paket Harga — Jasa Buat Website by Rakuuu",
    description:
      "Mulai dari Rp2 juta. Termasuk hosting, domain, dan maintenance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paket Harga — Jasa Buat Website by Rakuuu",
    description:
      "Mulai dari Rp2 juta. Termasuk hosting, domain, dan maintenance.",
  },
};

export default function PricingPage() {
  return (
    <main className="pt-24">
      <PricingSection />
    </main>
  );
}
