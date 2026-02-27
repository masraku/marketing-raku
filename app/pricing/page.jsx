import PricingSection from "@/components/sections/PricingSection";

export const metadata = {
  title: "Paket Harga — Jasa Buat Website by Rakuuu",
  description:
    "Paket layanan pembuatan website untuk UMKM. Mulai dari Rp2 juta. Termasuk hosting, domain, dan maintenance.",
};

export default function PricingPage() {
  return (
    <main className="pt-24">
      <PricingSection />
    </main>
  );
}
