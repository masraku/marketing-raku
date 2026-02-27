import FAQSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "FAQ — Jasa Buat Website by Rakuuu",
  description:
    "Pertanyaan umum seputar layanan pembuatan website oleh Rakuuu. Timeline, pembayaran, teknologi, dan lainnya.",
};

export default function FAQPage() {
  return (
    <main className="pt-24">
      <FAQSection />
    </main>
  );
}
