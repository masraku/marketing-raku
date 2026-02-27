"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  LogOut,
  Code2,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Projects", path: "/admin/projects", icon: FolderKanban },
  { name: "New Project", path: "/admin/projects/new", icon: PlusCircle },
  { name: "Clients", path: "/admin/clients", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <aside className="w-64 min-h-screen bg-zinc-950/80 border-r border-white/10 backdrop-blur-md flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-500 group-hover:scale-105 transition-transform duration-300">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">Admin Panel</span>
            <p className="text-xs text-gray-500">Jasa Buat Website</p>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path ||
              (item.path !== "/admin" && pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
