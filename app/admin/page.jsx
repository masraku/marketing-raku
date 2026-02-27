"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, clientsRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/clients"),
        ]);

        const projects = await projectsRes.json();
        const clients = await clientsRes.json();

        if (Array.isArray(projects)) {
          setStats({
            totalProjects: projects.length,
            activeProjects: projects.filter(
              (p) => p.status !== "completed" && p.status !== "cancelled",
            ).length,
            completedProjects: projects.filter((p) => p.status === "completed")
              .length,
            totalClients: Array.isArray(clients) ? clients.length : 0,
          });
          setRecentProjects(projects.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Sedang Aktif",
      value: stats.activeProjects,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Selesai",
      value: stats.completedProjects,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Klien",
      value: stats.totalClients,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {loading ? "—" : stat.value}
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Projects */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Project Terbaru</h2>
              <Link
                href="/admin/projects"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Lihat Semua →
              </Link>
            </div>

            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading...</p>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderKanban className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">Belum ada project.</p>
                <Link
                  href="/admin/projects/new"
                  className="text-sm text-white hover:underline mt-2 inline-block"
                >
                  Buat Project Baru
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500">
                          {project.orderId}
                        </span>
                        <h3 className="font-medium text-white text-sm">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {project.client?.name || "—"} ·{" "}
                        {project.type.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-mono w-8 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
