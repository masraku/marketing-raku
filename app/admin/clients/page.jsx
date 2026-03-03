"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Phone,
  Mail,
  Building,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import AuthGuard from "@/components/admin/AuthGuard";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [error, setError] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    async function fetch_() {
      try {
        const r = await fetch("/api/clients");
        const d = await r.json();
        if (Array.isArray(d)) setClients(d);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetch_();
  }, []);

  async function handleCreate() {
    if (!form.name || !form.phone) {
      setError("Nama dan HP wajib diisi");
      return;
    }
    try {
      const r = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.detail ? `${d.error}: ${d.detail}` : d.error);
        return;
      }
      setClients((p) => [d, ...p]);
      setForm({ name: "", phone: "", email: "", company: "" });
      setShowForm(false);
      setError("");
    } catch (e) {
      setError("Gagal menambah klien");
    }
  }

  function startEdit(client) {
    setEditingId(client.id);
    setEditForm({
      name: client.name,
      phone: client.phone,
      email: client.email || "",
      company: client.company || "",
    });
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ name: "", phone: "", email: "", company: "" });
    setEditError("");
  }

  async function handleEdit() {
    if (!editForm.name || !editForm.phone) {
      setEditError("Nama dan HP wajib diisi");
      return;
    }
    setEditSaving(true);
    try {
      const r = await fetch(`/api/clients/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const d = await r.json();
      if (!r.ok) {
        setEditError(d.error || "Gagal mengupdate klien");
        return;
      }
      setClients((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...d } : c)),
      );
      cancelEdit();
    } catch (e) {
      setEditError("Gagal mengupdate klien");
    } finally {
      setEditSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus klien ini?")) return;
    setDeletingId(id);
    setDeleteError("");
    try {
      const r = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      const d = await r.json();
      if (!r.ok) {
        setDeleteError(d.detail ? `${d.error}: ${d.detail}` : d.error);
        setTimeout(() => setDeleteError(""), 4000);
        return;
      }
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setDeleteError("Gagal menghapus klien");
      setTimeout(() => setDeleteError(""), 4000);
    } finally {
      setDeletingId(null);
    }
  }

  const ic =
    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all";

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white">Clients</h1>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Klien Baru
              </button>
            </div>

            {/* Delete Error Banner */}
            <AnimatePresence>
              {deleteError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {deleteError}
                </motion.div>
              )}
            </AnimatePresence>

            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-6 mb-6"
              >
                <h2 className="font-bold text-white mb-4">Tambah Klien</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={ic}
                    placeholder="Nama"
                  />
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className={ic}
                    placeholder="No. HP (62812...)"
                  />
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={ic}
                    placeholder="Email (opsional)"
                  />
                  <input
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    className={ic}
                    placeholder="Perusahaan (opsional)"
                  />
                </div>
                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                <button
                  onClick={handleCreate}
                  className="px-6 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-gray-200 cursor-pointer"
                >
                  Simpan
                </button>
              </motion.div>
            )}

            {loading ? (
              <p className="text-gray-500 text-center py-12">Loading...</p>
            ) : clients.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center">
                <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">Belum ada klien.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clients.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card rounded-xl p-5"
                  >
                    {editingId === c.id ? (
                      /* ── Edit Mode ── */
                      <div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                name: e.target.value,
                              })
                            }
                            className={ic}
                            placeholder="Nama"
                          />
                          <input
                            value={editForm.phone}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                phone: e.target.value,
                              })
                            }
                            className={ic}
                            placeholder="No. HP"
                          />
                          <input
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className={ic}
                            placeholder="Email (opsional)"
                          />
                          <input
                            value={editForm.company}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                company: e.target.value,
                              })
                            }
                            className={ic}
                            placeholder="Perusahaan (opsional)"
                          />
                        </div>
                        {editError && (
                          <p className="text-red-400 text-sm mb-3">
                            {editError}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleEdit}
                            disabled={editSaving}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 cursor-pointer disabled:opacity-50"
                          >
                            <Check className="w-3 h-3" />
                            {editSaving ? "Menyimpan..." : "Simpan"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs hover:text-white hover:border-white/20 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── View Mode ── */
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-white text-sm">
                            {c.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {c.phone}
                            </span>
                            {c.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {c.email}
                              </span>
                            )}
                            {c.company && (
                              <span className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                {c.company}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-400">
                            {c._count?.projects || 0} projects
                          </span>
                          <button
                            onClick={() => startEdit(c)}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                            title="Edit klien"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            disabled={deletingId === c.id}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer disabled:opacity-50"
                            title="Hapus klien"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
