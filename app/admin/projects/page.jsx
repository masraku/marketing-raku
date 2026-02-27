"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Plus, Search, ExternalLink } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.orderId.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-white/10 text-gray-400";
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Link>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari project, Order ID, atau klien..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all"
            />
          </div>

          {/* Projects List */}
          {loading ? (
            <p className="text-gray-500 text-center py-12">Loading...</p>
          ) : filtered.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <FolderKanban className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">
                {search
                  ? "Tidak ada project yang cocok."
                  : "Belum ada project."}
              </p>
              {!search && (
                <Link
                  href="/admin/projects/new"
                  className="text-sm text-white hover:underline"
                >
                  Buat Project Baru →
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center justify-between p-5 rounded-xl glass-card hover:bg-white/10 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs text-gray-500">
                          {project.orderId}
                        </span>
                        <h3 className="font-bold text-white text-sm truncate">
                          {project.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(project.status)}`}
                        >
                          {project.status.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs">
                        {project.client?.name || "—"} ·{" "}
                        {project.type.replace(/_/g, " ")} ·{" "}
                        {project._count?.updates || 0} updates
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <div className="text-right">
                        <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 font-mono">
                          {project.progress}%
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
