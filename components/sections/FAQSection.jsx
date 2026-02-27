"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "Berapa lama proses pembuatan website?",
    answer:
      "Tergantung kompleksitas project. Landing page sederhana bisa selesai 3-7 hari kerja. Website dengan fitur admin dan database biasanya 2-4 minggu. Untuk sistem custom yang lebih kompleks bisa 1-2 bulan.",
  },
  {
    question: "Apakah bisa request revisi?",
    answer:
      "Tentu! Selama proses development, kami menyediakan tahap review dan revisi. Revisi minor bisa dilakukan tanpa biaya tambahan. Untuk perubahan besar yang di luar scope awal, akan dibicarakan terlebih dahulu.",
  },
  {
    question: "Apakah sudah termasuk hosting dan domain?",
    answer:
      "Ya, semua paket sudah termasuk hosting dan domain. Biaya ini termasuk dalam biaya bulanan. Jika Anda sudah memiliki domain sendiri, kami bisa menggunakannya.",
  },
  {
    question: "Teknologi apa yang digunakan?",
    answer:
      "Kami menggunakan teknologi modern dan terkini: Next.js, React, Tailwind CSS, Node.js, dan PostgreSQL. Teknologi ini memastikan website Anda cepat, aman, dan mudah di-maintain.",
  },
  {
    question: "Bagaimana cara pembayaran?",
    answer:
      "Pembayaran dilakukan dengan sistem DP 50% di awal dan pelunasan 50% setelah website selesai. Untuk biaya bulanan (hosting & maintenance) dibayar setiap bulan melalui transfer bank.",
  },
  {
    question: "Apakah bisa tracking progress pengerjaan?",
    answer:
      "Bisa! Kami menyediakan sistem tracking order di website ini. Anda akan mendapat Order ID yang bisa digunakan untuk memantau progress pengerjaan secara real-time. Kami juga akan memberikan update rutin via WhatsApp.",
  },
  {
    question: "Apa yang terjadi jika saya ingin berhenti berlangganan bulanan?",
    answer:
      "Anda bisa mengajukan handover kapan saja setelah project selesai dan lunas. Kami akan migrasi semua data dan akses ke akun Anda sendiri. Detail proses handover bisa dilihat di bagian SOP Handover pada halaman pricing.",
  },
  {
    question: "Apakah website sudah SEO friendly?",
    answer:
      "Ya! Semua website yang kami buat sudah di-optimasi untuk SEO: meta tags, heading structure, mobile responsive, fast loading, dan semantic HTML. Anda juga bisa request tambahan setup Google Analytics dan Search Console.",
  },
];

function FAQItem({ item, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full text-left p-5 rounded-2xl glass-card transition-all duration-300",
          isOpen
            ? "border-purple-500/30 bg-white/10"
            : "hover:bg-white/10 hover:border-white/20",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-medium text-white text-sm md:text-base">
            {item.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-400 text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <Section id="faq" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
          Pertanyaan Umum
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Jawaban untuk pertanyaan yang sering ditanyakan tentang layanan kami.
        </p>
      </motion.div>

      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
