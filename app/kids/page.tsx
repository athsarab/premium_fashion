import { CollectionPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Kids collection', description: 'Explore Jeilees kidswear: playful essentials made for the days that become memories.', path: '/kids' })

export default function KidsPage() { return <CollectionPage kind="kids" /> }
