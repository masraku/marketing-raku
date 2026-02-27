"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  completed: {
    icon: Check,
    color: "text-green-400",
    bgColor: "bg-green-500/20 border-green-500/50",
    lineColor: "bg-green-500/50",
    label: "Selesai",
  },
  in_progress: {
    icon: Loader2,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20 border-yellow-500/50",
    lineColor: "bg-yellow-500/30",
    label: "Sedang Dikerjakan",
    animate: true,
  },
  pending: {
    icon: Clock,
    color: "text-gray-500",
    bgColor: "bg-white/5 border-white/10",
    lineColor: "bg-white/10",
    label: "Menunggu",
  },
};

export default function StageTimeline({ stages = [] }) {
  return (
    <div className="space-y-0">
      {stages.map((stage, index) => {
        const config = statusConfig[stage.status] || statusConfig.pending;
        const Icon = config.icon;
        const isLast = index === stages.length - 1;

        return (
          <div key={stage.id || index} className="relative flex gap-4">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10",
                  config.bgColor,
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    config.color,
                    config.animate && "animate-spin",
                  )}
                />
              </motion.div>
              {!isLast && (
                <div
                  className={cn("w-0.5 flex-1 min-h-[40px]", config.lineColor)}
                />
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn("pb-8 flex-1", isLast && "pb-0")}
            >
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-white text-sm">{stage.name}</h4>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      stage.status === "completed" &&
                        "bg-green-500/20 text-green-400",
                      stage.status === "in_progress" &&
                        "bg-yellow-500/20 text-yellow-400",
                      stage.status === "pending" && "bg-white/10 text-gray-400",
                    )}
                  >
                    {config.label}
                  </span>
                </div>
                {stage.progress > 0 && stage.status === "in_progress" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress stage</span>
                      <span className="text-gray-400">{stage.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.progress}%` }}
                        className="h-full rounded-full bg-yellow-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
