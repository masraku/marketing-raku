"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Folder,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import ProgressBar from "@/components/tracking/ProgressBar";
import StageTimeline from "@/components/tracking/StageTimeline";
import UpdateLog from "@/components/tracking/UpdateLog";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TrackDetailPage() {
  const params = useParams();
  const orderId = params.orderId;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(
          `/api/track?orderId=${encodeURIComponent(orderId)}`,
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Project tidak ditemukan");
          return;
        }

        setProject(data);
      } catch (err) {
        setError("Gagal memuat data. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Memuat data project...</p>
        </motion.div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Order Tidak Ditemukan
            </h2>
            <p className="text-gray-400 mb-6">
              Order ID &quot;{orderId}&quot; tidak ditemukan dalam sistem kami.
              Pastikan ID yang Anda masukkan sudah benar.
            </p>
            <Link href="/track">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 inline mr-2" />
                Coba Lagi
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/track"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 font-mono mb-2 inline-block">
                {project.orderId}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {project.name}
              </h1>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm text-gray-300 font-medium capitalize whitespace-nowrap">
              {project.type.replace(/_/g, " ")}
            </span>
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <User className="w-3.5 h-3.5" />
                Klien
              </div>
              <p className="text-white text-sm font-medium">
                {project.client?.name || "—"}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Mulai
              </div>
              <p className="text-white text-sm font-medium">
                {formatDate(project.startDate)}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Clock className="w-3.5 h-3.5" />
                Estimasi Selesai
              </div>
              <p className="text-white text-sm font-medium">
                {formatDate(project.estimatedEnd)}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Folder className="w-3.5 h-3.5" />
                Status
              </div>
              <p className="text-white text-sm font-medium capitalize">
                {project.status.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={project.progress} />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Stage Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Tahapan Project
            </h2>
            <StageTimeline stages={project.stages || []} />
          </motion.div>

          {/* Update Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Update Terbaru
            </h2>
            <UpdateLog updates={project.updates || []} />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
