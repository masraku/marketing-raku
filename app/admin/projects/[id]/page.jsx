"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Trash2,
  MessageSquare,
  Send,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import AuthGuard from "@/components/admin/AuthGuard";
import ProgressBar from "@/components/tracking/ProgressBar";
import { formatRupiah, parseRupiah } from "@/lib/format";

const statusOpts = [
  { value: "consultation", label: "Konsultasi" },
  { value: "deal", label: "Deal" },
  { value: "in_progress", label: "Sedang Dikerjakan" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];
const stageOpts = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const projectTypes = [
  { value: "landing_page", label: "Landing Page" },
  { value: "company_profile", label: "Company Profile" },
  { value: "web_app", label: "Web Application" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "digital_ecosystem", label: "Ekosistem Digital" },
  { value: "redesign", label: "Redesign & Optimasi" },
];

async function fetchProject(id) {
  const response = await fetch(`/api/projects/${id}`);
  const data = await response.json();

  return { ok: response.ok, data };
}

function toDateInputValue(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().slice(0, 10);
}

async function readApiResponse(response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [infoSaving, setInfoSaving] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [infoSuccess, setInfoSuccess] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("update");

  useEffect(() => {
    async function loadInitialProject() {
      try {
        const { ok, data } = await fetchProject(params.id);
        if (ok) setProject(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadInitialProject();
  }, [params.id]);

  async function load() {
    try {
      const { ok, data } = await fetchProject(params.id);
      if (ok) setProject(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function saveStatus() {
    setSaving(true);
    try {
      const r = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: project.status,
          progress: project.progress,
        }),
      });
      const data = await readApiResponse(r);
      if (r.ok) setProject((p) => ({ ...p, ...data }));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function saveInfo() {
    const orderId = project.orderId.trim();
    const projectName = project.name.trim();
    const projectType = project.type.trim();
    const clientName = project.client?.name?.trim() || "";
    const clientPhone = project.client?.phone?.trim() || "";

    if (
      !orderId ||
      !projectName ||
      !projectType ||
      !clientName ||
      !clientPhone
    ) {
      setInfoError(
        "Order ID, nama project, tipe project, nama klien, dan nomor HP wajib diisi",
      );
      return;
    }

    setInfoSaving(true);
    setInfoError("");
    setInfoSuccess("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
      const projectRes = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          orderId,
          name: projectName,
          type: projectType,
          description: project.description || "",
          totalCost: project.totalCost || "",
          paidAmount: project.paidAmount || "",
          startDate: toDateInputValue(project.startDate),
          estimatedEnd: toDateInputValue(project.estimatedEnd),
          client: {
            name: clientName,
            phone: clientPhone,
            email: project.client?.email || "",
            company: project.client?.company || "",
          },
        }),
      });
      const updatedProject = await readApiResponse(projectRes);

      if (!projectRes.ok) {
        setInfoError(updatedProject.error || "Gagal mengupdate project");
        return;
      }

      setProject(updatedProject);
      setInfoSuccess("Pesanan berhasil disimpan");
    } catch (e) {
      console.error(e);
      setInfoError(
        e.name === "AbortError"
          ? "Request terlalu lama. Coba simpan lagi."
          : "Gagal menyimpan informasi project",
      );
    } finally {
      clearTimeout(timeoutId);
      setInfoSaving(false);
    }
  }

  async function saveStages() {
    setSaving(true);
    try {
      const r = await fetch(`/api/projects/${params.id}/stages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stages: project.stages.map((s) => ({
            id: s.id,
            status: s.status,
            progress: s.progress,
          })),
        }),
      });
      const d = await r.json();
      if (r.ok) setProject((p) => ({ ...p, progress: d.progress }));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function addUpdate() {
    if (!msg.trim()) return;
    try {
      const r = await fetch(`/api/projects/${params.id}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, type: msgType }),
      });
      if (r.ok) {
        setMsg("");
        load();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function del() {
    if (!confirm("Yakin hapus project ini?")) return;
    try {
      await fetch(`/api/projects/${params.id}`, { method: "DELETE" });
      router.push("/admin/projects");
    } catch (e) {
      console.error(e);
    }
  }

  function waLink() {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const ph = project.client?.phone || "";
    const t = `🔔 *Update — ${project.name}*\nProgress: ${project.progress}%\nCek: ${base}/track/${project.orderId}`;
    return `https://wa.me/${ph}?text=${encodeURIComponent(t)}`;
  }

  if (loading)
    return (
      <AuthGuard>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </main>
        </div>
      </AuthGuard>
    );
  if (!project) return null;

  const ic =
    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-all";

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Link>
              <div className="flex items-center gap-2">
                <a
                  href={`/track/${project.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white text-xs flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  Preview
                </a>
                <button
                  onClick={del}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Hapus
                </button>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <span className="font-mono text-xs text-gray-500 px-2 py-1 rounded-lg bg-white/5 inline-block mb-3">
                    {project.orderId}
                  </span>
                  <h1 className="text-xl font-bold text-white">
                    Informasi Pesanan
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {project.type.replace(/_/g, " ")}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={saveInfo}
                  disabled={infoSaving}
                  className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {infoSaving ? "Menyimpan..." : "Simpan Pesanan"}
                </motion.button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Order ID
                  </label>
                  <input
                    value={project.orderId}
                    onChange={(e) =>
                      setProject({ ...project, orderId: e.target.value })
                    }
                    className={ic}
                    placeholder="RKU-2026-001"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Tipe Project
                  </label>
                  <select
                    value={project.type}
                    onChange={(e) =>
                      setProject({ ...project, type: e.target.value })
                    }
                    className={ic}
                  >
                    {projectTypes.map((type) => (
                      <option
                        key={type.value}
                        value={type.value}
                        className="bg-zinc-900"
                      >
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Nama Project
                  </label>
                  <input
                    value={project.name}
                    onChange={(e) =>
                      setProject({ ...project, name: e.target.value })
                    }
                    className={ic}
                    placeholder="Nama project"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Nama Klien
                  </label>
                  <input
                    value={project.client?.name || ""}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        client: { ...project.client, name: e.target.value },
                      })
                    }
                    className={ic}
                    placeholder="Nama klien"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Nomor HP Klien
                  </label>
                  <input
                    value={project.client?.phone || ""}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        client: { ...project.client, phone: e.target.value },
                      })
                    }
                    className={ic}
                    placeholder="62812..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Email Klien
                  </label>
                  <input
                    type="email"
                    value={project.client?.email || ""}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        client: { ...project.client, email: e.target.value },
                      })
                    }
                    className={ic}
                    placeholder="email@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Perusahaan
                  </label>
                  <input
                    value={project.client?.company || ""}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        client: {
                          ...project.client,
                          company: e.target.value,
                        },
                      })
                    }
                    className={ic}
                    placeholder="Nama perusahaan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Total Harga
                  </label>
                  <input
                    value={
                      project.totalCost ? formatRupiah(project.totalCost) : ""
                    }
                    onChange={(e) =>
                      setProject({
                        ...project,
                        totalCost: parseRupiah(e.target.value),
                      })
                    }
                    className={ic}
                    placeholder="Rp4.000.000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Sudah Dibayar
                  </label>
                  <input
                    value={
                      project.paidAmount ? formatRupiah(project.paidAmount) : ""
                    }
                    onChange={(e) =>
                      setProject({
                        ...project,
                        paidAmount: parseRupiah(e.target.value),
                      })
                    }
                    className={ic}
                    placeholder="Rp2.000.000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={toDateInputValue(project.startDate)}
                    onChange={(e) =>
                      setProject({ ...project, startDate: e.target.value })
                    }
                    className={ic}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Estimasi Selesai
                  </label>
                  <input
                    type="date"
                    value={toDateInputValue(project.estimatedEnd)}
                    onChange={(e) =>
                      setProject({ ...project, estimatedEnd: e.target.value })
                    }
                    className={ic}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={project.description || ""}
                    onChange={(e) =>
                      setProject({ ...project, description: e.target.value })
                    }
                    className={`${ic} min-h-[96px] resize-none`}
                    placeholder="Deskripsi singkat tentang project..."
                  />
                </div>
              </div>
              {infoError && (
                <p className="text-red-400 text-sm mt-3">{infoError}</p>
              )}
              {infoSuccess && (
                <p className="text-green-400 text-sm mt-3">{infoSuccess}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-bold text-white mb-4">
                    Status & Progress
                  </h2>
                  <div className="space-y-4">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        setProject({ ...project, status: e.target.value })
                      }
                      className={ic}
                    >
                      {statusOpts.map((o) => (
                        <option
                          key={o.value}
                          value={o.value}
                          className="bg-zinc-900"
                        >
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ProgressBar progress={project.progress} />
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={project.progress}
                        onChange={(e) =>
                          setProject({
                            ...project,
                            progress: parseInt(e.target.value),
                          })
                        }
                        className="flex-1 accent-white"
                      />
                      <span className="text-sm text-gray-400 font-mono w-10 text-right">
                        {project.progress}%
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={saveStatus}
                      disabled={saving}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Saving..." : "Simpan Status"}
                    </motion.button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-bold text-white mb-4">Tahapan</h2>
                  <div className="space-y-3">
                    {project.stages?.map((s, i) => (
                      <div
                        key={s.id}
                        className="p-3 rounded-lg bg-white/5 border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white font-medium">
                            {s.name}
                          </span>
                          <select
                            value={s.status}
                            onChange={(e) => {
                              const ns = [...project.stages];
                              ns[i] = {
                                ...s,
                                status: e.target.value,
                                progress:
                                  e.target.value === "completed"
                                    ? 100
                                    : e.target.value === "pending"
                                      ? 0
                                      : s.progress,
                              };
                              setProject({ ...project, stages: ns });
                            }}
                            className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 focus:outline-none"
                          >
                            {stageOpts.map((o) => (
                              <option
                                key={o.value}
                                value={o.value}
                                className="bg-zinc-900"
                              >
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        {s.status === "in_progress" && (
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={s.progress}
                              onChange={(e) => {
                                const ns = [...project.stages];
                                ns[i] = {
                                  ...s,
                                  progress: parseInt(e.target.value),
                                };
                                setProject({ ...project, stages: ns });
                              }}
                              className="flex-1 accent-white"
                            />
                            <span className="text-xs text-gray-400 font-mono w-8">
                              {s.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={saveStages}
                    disabled={saving}
                    className="w-full mt-4 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Simpan Tahapan"}
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6 border-green-500/20">
                  <h2 className="font-bold text-white mb-3 flex items-center gap-2">
                    <FaWhatsapp className="w-5 h-5 text-green-400" />
                    WhatsApp
                  </h2>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    Kirim Notifikasi
                  </a>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    Tambah Update
                  </h2>
                  <div className="space-y-3">
                    <select
                      value={msgType}
                      onChange={(e) => setMsgType(e.target.value)}
                      className={ic}
                    >
                      <option value="update" className="bg-zinc-900">
                        Update
                      </option>
                      <option value="milestone" className="bg-zinc-900">
                        Milestone
                      </option>
                      <option value="document" className="bg-zinc-900">
                        Document
                      </option>
                    </select>
                    <textarea
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className={`${ic} min-h-[80px] resize-none`}
                      placeholder="Pesan update..."
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addUpdate}
                      className="w-full px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Kirim
                    </motion.button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-bold text-white mb-4">Riwayat Update</h2>
                  {project.updates?.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      Belum ada update.
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {project.updates?.map((u) => (
                        <div
                          key={u.id}
                          className="p-3 rounded-lg bg-white/5 border border-white/5"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 capitalize">
                              {u.type}
                            </span>
                            <span className="text-xs text-gray-600">
                              {new Date(u.createdAt).toLocaleDateString(
                                "id-ID",
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{u.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
