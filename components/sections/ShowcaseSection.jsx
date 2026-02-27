"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { ExternalLink, Monitor } from "lucide-react";

const showcaseProjects = [
  {
    title: "Guna Maju Store",
    type: "E-Commerce / Product Catalog",
    description:
      "Catalog produk online untuk toko bahan bangunan dengan fitur kategori dan pencarian.",
    tags: ["Next.js", "Tailwind CSS", "Responsive"],
  },
  {
    title: "SmartWeb Dashboard",
    type: "Web Application",
    description:
      "Dashboard admin untuk manajemen konten dan analytics dengan visualisasi data real-time.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Jakarta Happy",
    type: "Landing Page",
    description:
      "Landing page event untuk komunitas Jakarta dengan registrasi online dan galeri.",
    tags: ["Next.js", "Animation", "Form"],
  },
  {
    title: "StreamSite",
    type: "Web Application",
    description:
      "Platform streaming lokal dengan fitur playlist, kategori konten, dan user management.",
    tags: ["Next.js", "Database", "Auth"],
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
            <Card className="p-0 overflow-hidden bg-white/5 border-white/10 h-full">
              {/* Placeholder preview area */}
              <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border-b border-white/10">
                <Monitor className="w-16 h-16 text-gray-700" />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 font-medium">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
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
