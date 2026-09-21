import { ShopAllPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Shop all', description: 'Browse the full JEILEE’S collection. Filter by category — Basics, Tops, Bottoms, Dresses, Skirts.', path: '/shop' })

export default function Shop() { return <ShopAllPage /> }

