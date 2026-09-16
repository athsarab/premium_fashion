import { CategoryBrowser, CollectionChapter, EditorialIntro, Featured, Footer, Hero, PageShell, SignatureBreak } from '@/components/fashion'
import { heroSlides } from '@/lib/fashion-data'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Modern clothing for considered lives', description: 'Discover VERRA, an independent London fashion house creating expressive, considered clothing for men, women, and kids.', path: '/' })

export default function Home() {
  return <PageShell><main><Hero image={heroSlides[0].image} slides={heroSlides} /><EditorialIntro /><section id="collections"><CollectionChapter collection="men" index={1} /><CollectionChapter collection="women" index={2} /><CollectionChapter collection="kids" index={3} /></section><Featured /><CategoryBrowser /><SignatureBreak /><Footer /></main></PageShell>
}
