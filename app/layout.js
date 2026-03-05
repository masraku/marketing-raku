import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import PublicShell from '@/components/PublicShell'
import StructuredData from '@/components/StructuredData'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Jasa Pembuatan Website Profesional & Terpercaya | Rakuuu', 
  description:
    'Jasa pembuatan website profesional untuk UMKM dan Perusahaan. Bikin web company profile, toko online, web custom dengan SEO gratis. Proses cepat & terjangkau.',
  keywords: [
    'Jasa Pembuatan Website',
    'Jasa Buat Website',
    'Bikin Website Murah',
    'Jasa Web Developer Indonesia',
    'Jasa Pembuatan Web Company Profile',
    'Jasa Pembuatan Toko Online',
    'Jasa Buat Website UMKM',
    'Jasa Web Design Jakarta',
    'Jasa Pembuatan Website Profesional',
    'Rakuuu',
  ],
  authors: [{ name: 'Rakuuu' }],
  openGraph: {
    title: 'Jasa Pembuatan Website Profesional & Terpercaya | Rakuuu',
    description: 'Bikin website cepat, modern, dan SEO-friendly untuk bisnis Anda.',
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website Profesional & Terpercaya | Rakuuu',
    description: 'Bikin website cepat, modern, dan SEO-friendly untuk bisnis Anda.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-white antialiased selection:bg-white/30 selection:text-white`}
      >
        <StructuredData />
        <Providers>
          <PublicShell>{children}</PublicShell>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

