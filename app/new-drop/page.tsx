import { NewDropPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'New Drop', description: 'Shop the latest arrivals at JEILEE’S. Fresh pieces that just hit the floor — be the first to wear them.', path: '/new-drop' })

export default function NewDrop() { return <NewDropPage /> }

