"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Palette,
  Code2,
  TestTube2,
  Rocket,
  Headphones,
} from "lucide-react";

const processSteps = [
  {
    icon: MessageSquare,
    title: "Konsultasi & Analisis",
    description:
      "Kami dengarkan kebutuhan bisnis Anda dan analisis fitur yang diperlukan",
    color: "text-cyan-400",
  },
  {
    icon: Palette,
    title: "Desain UI/UX",
    description:
      "Mockup dan wireframe diserahkan untuk approval sebelum development",
    color: "text-purple-400",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Tim kami mengerjakan website dengan teknologi modern dan best practices",
    color: "text-pink-400",
  },
  {
    icon: TestTube2,
    title: "Testing & Review",
    description:
      "Testing menyeluruh dan review bersama klien untuk memastikan kualitas",
    color: "text-blue-400",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Website di-deploy ke server production dan go live!",
    color: "text-green-400",
  },
  {
    icon: Headphones,
    title: "Maintenance & Support",
    description:
      "Kami tetap mendampingi setelah launch. Maintenance rutin dan support teknis",
    color: "text-orange-400",
  },
];

export default function ProcessSection() {
  return (
    <Section id="proses" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
          Proses Kerja
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Dari konsultasi hingga go live — kami pastikan setiap tahap berjalan
          transparan dan terukur.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

        <div className="space-y-8 md:space-y-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative md:flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content Card */}
                <div
                  className={`md:w-5/12 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
                >
                  <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <div
                      className={`flex items-center gap-4 mb-3 ${isEven ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-mono">
                          Step {index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </div>

                {/* Center Dot (desktop) */}
                <div className="hidden md:flex md:w-2/12 justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 relative z-10" />
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
