import { CollectionPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: "Women's collection", description: 'Explore Jeilees womenswear: fluid forms and considered colour made for every version of you.', path: '/women' })

export default function WomenPage() { return <CollectionPage kind="women" /> }
