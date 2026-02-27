import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Kontak — Jasa Buat Website by Rakuuu",
  description:
    "Hubungi kami untuk konsultasi gratis pembuatan website. Chat langsung via WhatsApp atau kirim email.",
  keywords: [
    "kontak jasa buat website",
    "konsultasi website gratis",
    "hubungi web developer",
    "WhatsApp jasa website",
  ],
  openGraph: {
    title: "Kontak — Jasa Buat Website by Rakuuu",
    description:
      "Konsultasi gratis! Chat langsung via WhatsApp atau kirim email.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak — Jasa Buat Website by Rakuuu",
    description:
      "Konsultasi gratis! Chat langsung via WhatsApp atau kirim email.",
  },
};

export default function ContactPage() {
  return (
    <main className="pt-24">
      <ContactSection />
    </main>
  );
}
