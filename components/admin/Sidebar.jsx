"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  LogOut,
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
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const user = session?.user;

  return (
    <aside className="w-64 min-h-screen bg-zinc-950/80 border-r border-white/10 backdrop-blur-md flex flex-col">
      {/* Profile */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3 group">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "Admin"}
              width={36}
              height={36}
              className="rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
          )}
          <div className="min-w-0">
            <span className="font-bold text-sm text-white block truncate">
              {user?.name || "Admin"}
            </span>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "Jasa Buat Website"}
            </p>
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
