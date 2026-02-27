import FAQSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "FAQ — Jasa Buat Website by Rakuuu",
  description:
    "Pertanyaan umum seputar layanan pembuatan website oleh Rakuuu. Timeline, pembayaran, teknologi, dan lainnya.",
  keywords: [
    "FAQ jasa buat website",
    "pertanyaan pembuatan website",
    "berapa lama buat website",
    "cara pesan website",
  ],
  openGraph: {
    title: "FAQ — Jasa Buat Website by Rakuuu",
    description:
      "Pertanyaan umum seputar timeline, pembayaran, teknologi, dan lainnya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Jasa Buat Website by Rakuuu",
    description:
      "Pertanyaan umum seputar timeline, pembayaran, teknologi, dan lainnya.",
  },
};

export default function FAQPage() {
  return (
    <main className="pt-24">
      <FAQSection />
    </main>
  );
}
