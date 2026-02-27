"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

const projectTypes = [
  { value: "landing_page", label: "Landing Page" },
  { value: "company_profile", label: "Company Profile" },
  { value: "web_app", label: "Web Application" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "digital_ecosystem", label: "Ekosistem Digital" },
  { value: "redesign", label: "Redesign & Optimasi" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);

  const [form, setForm] = useState({
    orderId: "",
    name: "",
    type: "landing_page",
    description: "",
    clientId: "",
    totalCost: "",
    startDate: "",
    estimatedEnd: "",
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        if (Array.isArray(data)) setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    }
    fetchClients();

    // Auto-generate Order ID
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999) + 1;
    setForm((prev) => ({
      ...prev,
      orderId: `RKU-${year}-${String(random).padStart(3, "0")}`,
    }));
  }, []);

  const handleCreateClient = async () => {
    if (!clientForm.name || !clientForm.phone) {
      setError("Nama dan nomor HP klien wajib diisi");
      return;
    }

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal menambah klien");
        return;
      }

      setClients((prev) => [data, ...prev]);
      setForm((prev) => ({ ...prev, clientId: data.id }));
      setShowNewClient(false);
      setClientForm({ name: "", phone: "", email: "", company: "" });
      setError("");
    } catch (err) {
      setError("Gagal menambah klien");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.orderId || !form.name || !form.type || !form.clientId) {
      setError("Order ID, nama project, tipe, dan klien wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal membuat project");
        return;
      }

      router.push(`/admin/projects/${data.id}`);
    } catch (err) {
      setError("Gagal membuat project");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <h1 className="text-2xl font-bold text-white mb-8">Project Baru</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Order ID
              </label>
              <input
                type="text"
                value={form.orderId}
                onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                className={inputClass}
                placeholder="RKU-2026-001"
              />
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nama Project
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Website Toko ABC"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipe Project
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deskripsi (opsional)
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={`${inputClass} min-h-[100px] resize-none`}
                placeholder="Deskripsi singkat tentang project..."
              />
            </div>

            {/* Client */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Klien
                </label>
                <button
                  type="button"
                  onClick={() => setShowNewClient(!showNewClient)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                  Klien Baru
                </button>
              </div>

              {showNewClient && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="glass-card rounded-xl p-4 mb-3 space-y-3"
                >
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) =>
                      setClientForm({ ...clientForm, name: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Nama klien"
                  />
                  <input
                    type="text"
                    value={clientForm.phone}
                    onChange={(e) =>
                      setClientForm({ ...clientForm, phone: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Nomor WhatsApp (62812...)"
                  />
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) =>
                      setClientForm({ ...clientForm, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Email (opsional)"
                  />
                  <input
                    type="text"
                    value={clientForm.company}
                    onChange={(e) =>
                      setClientForm({ ...clientForm, company: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Perusahaan (opsional)"
                  />
                  <button
                    type="button"
                    onClick={handleCreateClient}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Simpan Klien
                  </button>
                </motion.div>
              )}

              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className={inputClass}
              >
                <option value="" className="bg-zinc-900">
                  Pilih Klien
                </option>
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    className="bg-zinc-900"
                  >
                    {client.name} ({client.phone})
                  </option>
                ))}
              </select>
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Biaya (opsional)
              </label>
              <input
                type="text"
                value={form.totalCost}
                onChange={(e) =>
                  setForm({ ...form, totalCost: e.target.value })
                }
                className={inputClass}
                placeholder="Rp4.000.000"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estimasi Selesai
                </label>
                <input
                  type="date"
                  value={form.estimatedEnd}
                  onChange={(e) =>
                    setForm({ ...form, estimatedEnd: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Buat Project"}
            </motion.button>
          </form>
        </div>
      </main>
    </div>
  );
}
