"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Eye,
  UserCheck,
  BarChart3,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import AuthGuard from "@/components/admin/AuthGuard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [traffic, setTraffic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trafficLoading, setTrafficLoading] = useState(true);

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

    async function fetchTraffic() {
      try {
        const res = await fetch("/api/admin/traffic");
        if (res.ok) {
          const data = await res.json();
          setTraffic(data);
        }
      } catch (error) {
        console.error("Failed to fetch traffic:", error);
      } finally {
        setTrafficLoading(false);
      }
    }

    fetchData();
    fetchTraffic();
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

  // Hitung max views untuk chart scaling
  const maxViews = traffic?.dailyViews
    ? Math.max(...traffic.dailyViews.map((d) => d.views), 1)
    : 1;

  return (
    <AuthGuard>
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

            {/* Traffic Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">
                  Traffic Pengunjung
                </h2>
              </div>

              {/* Traffic Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-gray-400 text-sm">
                      Views Hari Ini
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {trafficLoading
                      ? "—"
                      : (traffic?.todayViews || 0).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-400 text-sm">
                      Visitor Unik Hari Ini
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {trafficLoading
                      ? "—"
                      : (traffic?.todayUnique || 0).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="text-gray-400 text-sm">Total Views</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {trafficLoading
                      ? "—"
                      : (traffic?.totalViews || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Chart & Top Pages */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Bar Chart — 7 Hari Terakhir */}
                <div className="lg:col-span-2 glass-card rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Views 7 Hari Terakhir
                  </h3>
                  {trafficLoading ? (
                    <div className="flex items-end gap-2 h-40 justify-center">
                      <p className="text-gray-600 text-sm">Loading...</p>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2 h-40">
                      {(traffic?.dailyViews || []).map((day, i) => {
                        const height =
                          maxViews > 0
                            ? Math.max((day.views / maxViews) * 100, 4)
                            : 4;
                        const isToday =
                          i === (traffic?.dailyViews?.length || 0) - 1;

                        return (
                          <div
                            key={day.date}
                            className="flex-1 flex flex-col items-center gap-1"
                          >
                            <span className="text-xs text-gray-500 font-mono">
                              {day.views}
                            </span>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{
                                delay: 0.5 + i * 0.08,
                                duration: 0.5,
                                ease: "easeOut",
                              }}
                              className={`w-full rounded-t-md ${
                                isToday
                                  ? "bg-gradient-to-t from-cyan-500 to-cyan-400"
                                  : "bg-gradient-to-t from-white/10 to-white/20"
                              }`}
                              style={{ minHeight: "4px" }}
                            />
                            <span
                              className={`text-[10px] mt-1 ${
                                isToday
                                  ? "text-cyan-400 font-semibold"
                                  : "text-gray-600"
                              }`}
                            >
                              {day.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Top Pages */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Top Halaman
                  </h3>
                  {trafficLoading ? (
                    <p className="text-gray-600 text-sm">Loading...</p>
                  ) : (traffic?.topPages || []).length === 0 ? (
                    <p className="text-gray-600 text-sm text-center py-4">
                      Belum ada data
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {(traffic?.topPages || []).map((page, i) => {
                        const topViews = traffic.topPages[0]?.views || 1;
                        const width = Math.max(
                          (page.views / topViews) * 100,
                          8,
                        );

                        return (
                          <div key={page.path}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-300 truncate max-w-[160px]">
                                {page.path === "/" ? "Home" : page.path}
                              </span>
                              <span className="text-xs text-gray-500 font-mono ml-2">
                                {page.views}
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{
                                  delay: 0.6 + i * 0.1,
                                  duration: 0.5,
                                }}
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500/60 to-cyan-400"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Recent Projects */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  Project Terbaru
                </h2>
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
    </AuthGuard>
  );
}
