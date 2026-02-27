"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[8rem] md:text-[10rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-white/5 select-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
            Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
            Silakan kembali ke halaman utama.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/track"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Track Order
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
