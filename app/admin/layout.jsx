export const metadata = {
  title: "Admin Panel — Jasa Buat Website",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-zinc-950">{children}</div>;
}
