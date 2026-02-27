"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProgressBar({ progress = 0, className }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-400">
          Progress Keseluruhan
        </span>
        <span className="text-sm font-bold text-white">{progress}%</span>
      </div>
      <div className="w-full h-3 rounded-full bg-white/10 border border-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            progress < 30 && "from-red-500 to-orange-500",
            progress >= 30 && progress < 70 && "from-yellow-500 to-orange-500",
            progress >= 70 && "from-green-500 to-emerald-500",
          )}
        />
      </div>
    </div>
  );
}
