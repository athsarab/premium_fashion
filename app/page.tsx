import { EditorialIntro, Footer, Hero, PageShell, ShopShowcase, SignatureBreak } from '@/components/fashion'
import { heroSlides } from '@/lib/fashion-data'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Anime Extravaganza 1.0 — Streetwear with a story', description: 'Discover Jeilees, an independent fashion label creating anime-inspired oversized tees and bold streetwear. Shop the Anime Extravaganza 1.0 drop.', path: '/' })

export default function Home() {
  return <PageShell><main><Hero image={heroSlides[0].image} slides={heroSlides} /><EditorialIntro /><ShopShowcase /><SignatureBreak /><Footer /></main></PageShell>
}
