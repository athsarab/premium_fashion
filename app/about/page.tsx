import { AboutPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Our story', description: 'Learn about VERRA, an independent London fashion house making precise, expressive clothing for considered lives.', path: '/about' })

export default function About() { return <AboutPage /> }
