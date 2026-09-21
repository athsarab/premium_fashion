import { CollectionListPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Collections', description: 'Explore all Jeilees collections. Curated drops, limited editions — every collection tells a story.', path: '/collections' })

export default function Collections() { return <CollectionListPage /> }

