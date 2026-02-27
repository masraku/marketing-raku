import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedBackground from '@/components/AnimatedBackground'

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
  title: 'Jasa Buat Website by Rakuuu — Website Profesional untuk Bisnis Anda',
  description:
    'Jasa pembuatan website profesional untuk UMKM dan perusahaan. Landing page, company profile, web application, dan ekosistem digital. All-custom, modern, dan scalable.',
  keywords: [
    'Jasa Buat Website',
    'Jasa Pembuatan Website',
    'Web Developer Indonesia',
    'Landing Page UMKM',
    'Company Profile',
    'Web Application',
    'Rakuuu',
  ],
  authors: [{ name: 'Rakuuu' }],
  openGraph: {
    title: 'Jasa Buat Website by Rakuuu',
    description: 'Website profesional untuk segala kebutuhan bisnis Anda.',
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Buat Website by Rakuuu',
    description: 'Website profesional untuk segala kebutuhan bisnis Anda.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-white antialiased selection:bg-white/30 selection:text-white`}
      >
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
