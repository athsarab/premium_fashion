import { CollectionSpotlight, EditorialIntro, Footer, Hero, NewDropMarquee, SaleStrip, ShopByCategory, SignatureBreak, PageShell } from '@/components/fashion'
import { heroSlides } from '@/lib/fashion-data'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Modern clothing for considered lives', description: 'Discover Jeilees, an independent fashion house creating expressive, considered clothing. Shop our latest collections, new drops, and curated categories.', path: '/' })

export default function Home() {
  return (
    <PageShell>
      <main>
        <Hero image={heroSlides[0].image} slides={heroSlides} />
        <EditorialIntro />
        <NewDropMarquee />
        <CollectionSpotlight />
        <ShopByCategory />
        <SaleStrip />
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )

}
