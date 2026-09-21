import { SalePage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Sale', description: 'Selected Jeilees pieces at special prices. Premium fashion at considered reductions — while they last.', path: '/sale' })

export default function Sale() { return <SalePage /> }

