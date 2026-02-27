"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-500 group-hover:scale-105 transition-transform duration-300">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Jasa Buat Website by Rakuuu
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Solusi pembuatan website profesional untuk segala kebutuhan bisnis
              Anda. Dari landing page UMKM hingga ekosistem digital perusahaan.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Navigasi</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { name: "Layanan", path: "/services" },
                { name: "Paket Harga", path: "/pricing" },
                { name: "FAQ", path: "/faq" },
                { name: "Kontak", path: "/contact" },
                { name: "Track Order", path: "/track" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Hubungi Kami</h3>
            <div className="flex gap-4">
              <a
                href="https://wa.me/6282146150660"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/masraku"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/masrakuuu/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/masrakuuu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Jasa Buat Website by Rakuuu. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> using Next.js &
            Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
