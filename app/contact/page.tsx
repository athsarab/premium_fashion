import { ContactPage } from '@/components/fashion'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Contact VERRA', description: 'Contact VERRA for press, partnerships, stockists, or to start a conversation with our fashion house.', path: '/contact' })

export default function Contact() { return <ContactPage /> }
