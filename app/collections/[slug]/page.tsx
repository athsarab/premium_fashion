import { CollectionDetailPage } from '@/components/fashion'
import { collections } from '@/lib/fashion-data'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = collections.find((c) => c.slug === slug)
  return pageMetadata({
    title: collection?.name || 'Collection',
    description: collection?.description || 'Explore this JEILEE’S collection.',
    path: `/collections/${slug}`,
  })
}

export default async function CollectionRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CollectionDetailPage slug={slug} />
}

