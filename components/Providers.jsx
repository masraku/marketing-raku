"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return (
    <SessionProvider
      refetchInterval={5 * 60} // cek session tiap 5 menit
      refetchOnWindowFocus={true} // cek saat tab kembali aktif
    >
      {children}
    </SessionProvider>
  );
}
