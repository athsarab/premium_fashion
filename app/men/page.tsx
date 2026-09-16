import { CollectionPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: "Men's collection", description: 'Explore VERRA menswear: considered tailoring, precise proportions, and layers designed for a life in motion.', path: '/men' })

export default function MenPage() { return <CollectionPage kind="men" /> }
