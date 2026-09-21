import { OurStoryPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Our Story', description: 'The story behind Jeilees — how an independent London fashion house became a voice in considered fashion.', path: '/our-story' })

export default function OurStory() { return <OurStoryPage /> }

