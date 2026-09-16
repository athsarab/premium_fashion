export type CollectionKey = 'men' | 'women' | 'kids'

export const collections = {
  men: { key: 'men' as const, label: "MEN'S COLLECTION", title: 'Defined by confidence.', description: 'Tailoring with a quiet edge. Considered layers, precise proportions, and a life lived in motion.', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8b8?auto=format&fit=crop&w=1800&q=85', poster: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8b8?auto=format&fit=crop&w=900&q=85', tone: 'charcoal' },
  women: { key: 'women' as const, label: "WOMEN'S COLLECTION", title: 'Made to express.', description: 'Fluid forms and considered color for every version of you.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85', poster: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85', tone: 'clay' },
  kids: { key: 'kids' as const, label: 'KIDS COLLECTION', title: 'Small style. Big personality.', description: 'Playful essentials made for the days that become memories.', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1800&q=85', poster: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85', tone: 'sage' },
}

export type Product = { name: string, collection: CollectionKey, category: string, price: string, image: string, fallbackImage: string, imageAlt: string }

export const products: Product[] = [
  { name: 'The Column Coat', collection: 'men', category: 'Outerwear / Men', price: '£420', image: '/images/products/men/column-coat.jpg', fallbackImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=85', imageAlt: 'VERRA men\'s column coat' },
  { name: 'The Studio Overshirt', collection: 'men', category: 'Layers / Men', price: '£240', image: '/images/products/men/studio-overshirt.jpg', fallbackImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8b8?auto=format&fit=crop&w=1000&q=85', imageAlt: 'VERRA men\'s studio overshirt' },
  { name: 'Sculpted Knit', collection: 'women', category: 'Knitwear / Women', price: '£180', image: '/images/products/women/sculpted-knit.jpg', fallbackImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85', imageAlt: 'VERRA women\'s sculpted knit' },
  { name: 'The Bias Dress', collection: 'women', category: 'Dresses / Women', price: '£295', image: '/images/products/women/bias-dress.jpg', fallbackImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85', imageAlt: 'VERRA women\'s bias dress' },
  { name: 'Pocket Overshirt', collection: 'kids', category: 'Play / Kids', price: '£95', image: '/images/products/kids/pocket-overshirt.jpg', fallbackImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85', imageAlt: 'VERRA kids pocket overshirt' },
  { name: 'Weekend Set', collection: 'kids', category: 'Essentials / Kids', price: '£85', image: '/images/products/kids/weekend-set.jpg', fallbackImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85', imageAlt: 'VERRA kids weekend set' },
]

export const navItems = [{ label: 'Men', href: '/men' }, { label: 'Women', href: '/women' }, { label: 'Kids', href: '/kids' }, { label: 'Our story', href: '/about' }, { label: 'Contact', href: '/contact' }]

export const heroImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90'
export const storyImage = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
export const signatureImage = 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=2200&q=85'
