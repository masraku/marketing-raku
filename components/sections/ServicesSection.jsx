"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import {
  Globe,
  Building2,
  Code2,
  Network,
  ShoppingCart,
  RefreshCcw,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Landing Page UMKM",
    desc: "Website sederhana dan efektif untuk UMKM yang ingin go-digital. Mobile friendly, cepat, dan sudah termasuk domain.",
    color: "text-cyan-400",
  },
  {
    icon: Building2,
    title: "Company Profile",
    desc: "Website profesional untuk memperkenalkan perusahaan Anda. Desain modern dengan informasi lengkap tentang bisnis.",
    color: "text-purple-400",
  },
  {
    icon: Code2,
    title: "Web Application",
    desc: "Sistem custom sesuai kebutuhan bisnis — POS, inventory, CRM, booking system, dan lainnya. Full admin panel.",
    color: "text-pink-400",
  },
  {
    icon: Network,
    title: "Ekosistem Digital",
    desc: "Integrasi multi-platform untuk perusahaan besar. Dashboard analytics, API integration, dan sistem terpadu.",
    color: "text-blue-400",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Toko online custom dengan manajemen produk, keranjang belanja, pembayaran, dan pelacakan pesanan.",
    color: "text-green-400",
  },
  {
    icon: RefreshCcw,
    title: "Redesign & Optimasi",
    desc: "Perbaikan dan modernisasi website yang sudah ada. Tingkatkan performa, desain, dan pengalaman pengguna.",
    color: "text-orange-400",
  },
];

export default function ServicesSection() {
  return (
    <Section
      id="layanan"
      className="py-20 px-6 max-w-7xl mx-auto relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
          Layanan Kami
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Kami menyediakan berbagai jenis layanan pembuatan website yang
          disesuaikan dengan kebutuhan dan skala bisnis Anda.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-8 bg-white/5 border-white/5 hover:border-purple-500/30 group h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
