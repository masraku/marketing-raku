"use client";

import { motion } from "framer-motion";
import { MessageSquare, Flag, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const typeConfig = {
  update: {
    icon: MessageSquare,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    label: "Update",
  },
  milestone: {
    icon: Flag,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    label: "Milestone",
  },
  document: {
    icon: FileText,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    label: "Dokumen",
  },
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function UpdateLog({ updates = [] }) {
  if (updates.length === 0) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <MessageSquare className="w-8 h-8 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Belum ada update.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {updates.map((update, index) => {
        const config = typeConfig[update.type] || typeConfig.update;
        const Icon = config.icon;

        return (
          <motion.div
            key={update.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  config.bgColor,
                )}
              >
                <Icon className={cn("w-4 h-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      config.bgColor,
                      config.color,
                    )}
                  >
                    {config.label}
                  </span>
                  <span className="text-xs text-gray-500 shrink-0">
                    {formatDate(update.createdAt)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {update.message}
                </p>
                {update.fileUrl && (
                  <a
                    href={update.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-purple-400 hover:text-purple-300"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Lihat Dokumen
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
