import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteMetadata } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = { metadataBase: new URL(siteMetadata.siteUrl), title: { default: 'Jeilees — Clothing for considered lives', template: '%s | Jeilees' }, description: 'Jeilees is an independent fashion house for considered lives. Explore our latest collections for men, women, and kids.', keywords: ['independent fashion house', 'considered clothing', 'London fashion', 'Jeilees'], authors: [{ name: 'Jeilees Studio' }], creator: 'Jeilees Studio', robots: { index: true, follow: true }, generator: 'Next.js' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f1eee8' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
