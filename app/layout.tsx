import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteMetadata } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = { metadataBase: new URL(siteMetadata.siteUrl), title: { default: 'JEILEE’S — Clothing for considered lives', template: '%s | JEILEE’S' }, description: 'JEILEE’S is an independent fashion house for considered lives. Explore our latest collections, new drops, and curated categories.', keywords: ['independent fashion house', 'considered clothing', 'London fashion', 'JEILEE’S'], authors: [{ name: 'JEILEE’S Studio' }], creator: 'JEILEE’S Studio', icons: { icon: '/images/logo/logo.jpeg', shortcut: '/images/logo/logo.jpeg', apple: '/images/logo/logo.jpeg' }, robots: { index: true, follow: true }, generator: 'Next.js' }

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f1eee8' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
