"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const showcaseProjects = [
  {
    title: "Disnaker Kerjasimpel",
    type: "Web Application",
    description:
      "Platform pencarian kerja sederhana dengan fitur lowongan, pelamar, dan dashboard admin untuk Dinas Tenaga Kerja.",
    tags: ["Next.js", "Tailwind CSS", "Full Stack"],
    image: "/assets/images/disnaker.jpg",
    url: "https://kerjasimpel.vercel.app/",
  },
  {
    title: "Mulia Berkat Alkes",
    type: "Company Profile",
    description:
      "Website company profile untuk distributor alat kesehatan dengan katalog produk dan halaman informasi perusahaan.",
    tags: ["Next.js", "Responsive", "SEO"],
    image: "/assets/images/mba.jpg",
    url: "https://muliaberkatalkes.com",
  },
  {
    title: "Web Pengaduan",
    type: "Web Application",
    description:
      "Sistem pengaduan online untuk masyarakat dengan fitur pelaporan, tracking status, dan dashboard admin.",
    tags: ["Next.js", "PostgreSQL", "Auth"],
    image: "/assets/images/pengaduan.jpg",
    url: "https://web-pengaduan.vercel.app/user",
  },
  {
    title: "Rakugo Studio",
    type: "Landing Page",
    description:
      "Landing page studio kreatif dengan desain modern, animasi smooth, dan tampilan portofolio yang menarik.",
    tags: ["Next.js", "Framer Motion", "Design"],
    image: "/assets/images/rakugo.jpg",
    url: "https://rakugo.studio/",
  },
];

export default function ShowcaseSection() {
  return (
    <Section
      id="portofolio"
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
          Portofolio
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Beberapa project yang pernah kami kerjakan. Setiap project dibuat
          custom sesuai kebutuhan klien.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showcaseProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-0 overflow-hidden bg-white/5 border-white/10 h-full group">
              {/* Screenshot */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-56 overflow-hidden border-b border-white/10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-gray-200 font-medium border border-white/10">
                    {project.type}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3" />
                    Lihat Website
                  </span>
                </div>
              </a>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
