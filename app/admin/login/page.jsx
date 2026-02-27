"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-2">
            Login menggunakan akun Google yang terdaftar
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            Masuk dengan Google
          </motion.button>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs text-center">
              Hanya akun yang terdaftar sebagai admin yang dapat mengakses
              dashboard.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
