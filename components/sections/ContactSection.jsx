"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  return (
    <Section id="kontak" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
          Siap Mulai Project?
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          Konsultasi gratis! Ceritakan kebutuhan bisnis Anda dan kami akan bantu
          menemukan solusi website yang tepat.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/6282146150660?text=Halo%20Rakuuu%2C%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-green-500/50 transition-colors duration-300 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaWhatsapp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">WhatsApp</h3>
            <p className="text-gray-400 text-sm">
              Chat langsung untuk konsultasi cepat
            </p>
            <span className="text-green-400 text-sm font-medium flex items-center gap-1">
              Chat Sekarang <ArrowRight className="w-4 h-4" />
            </span>
          </motion.a>

          {/* Email Card */}
          <motion.a
            href="mailto:masraku@masraku.dev"
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-purple-500/50 transition-colors duration-300 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Email</h3>
            <p className="text-gray-400 text-sm">
              Kirim detail kebutuhan project Anda
            </p>
            <span className="text-purple-400 text-sm font-medium flex items-center gap-1">
              Kirim Email <ArrowRight className="w-4 h-4" />
            </span>
          </motion.a>
        </div>

        <p className="text-gray-500 text-sm">
          Atau langsung hubungi kami di{" "}
          <a
            href="https://wa.me/6282146150660"
            className="text-white hover:underline"
          >
            +62 821-4615-0660
          </a>
        </p>
      </motion.div>
    </Section>
  );
}
