"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!orderId.trim()) {
      setError("Masukkan Order ID Anda");
      return;
    }

    router.push(`/track/${orderId.trim()}`);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
            Track Order
          </h1>
          <p className="text-gray-400 text-lg">
            Masukkan Order ID untuk memantau progress pengerjaan website Anda.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8"
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Order ID
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Contoh: RKU-2026-001"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            />
            <Button type="submit" className="px-6">
              <Search className="w-4 h-4" />
              Cari
            </Button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-sm text-center">
              Order ID diberikan saat proyek Anda mulai dikerjakan. Hubungi kami
              jika Anda lupa Order ID.
            </p>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
