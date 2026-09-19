export type CollectionKey = 'men' | 'women' | 'kids'

export const collections = {
  men: { key: 'men' as const, label: "MEN'S COLLECTION", title: 'Defined by confidence.', description: 'Tailoring with a quiet edge. Considered layers, precise proportions, and a life lived in motion.', image: '/images/products/men/men2.jpg', poster: '/images/products/men/men2.jpg', tone: 'charcoal' },
  women: { key: 'women' as const, label: "WOMEN'S COLLECTION", title: 'Made to express.', description: 'Fluid forms and considered color for every version of you.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85', poster: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85', tone: 'clay' },
  kids: { key: 'kids' as const, label: 'KIDS COLLECTION', title: 'Small style. Big personality.', description: 'Playful essentials made for the days that become memories.', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1800&q=85', poster: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85', tone: 'sage' },
}

export type Product = { name: string, collection: CollectionKey, category: string, price: string, image: string, fallbackImage: string, imageAlt: string }

export const products: Product[] = [
  { name: 'The Column Coat', collection: 'men', category: 'Outerwear / Men', price: '£420', image: '/images/products/men/men3.jpg', fallbackImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=85', imageAlt: 'Jeilees men\'s column coat' },
  { name: 'The Studio Overshirt', collection: 'men', category: 'Layers / Men', price: '£240', image: '/images/products/men/men1.jpg', fallbackImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8b8?auto=format&fit=crop&w=1000&q=85', imageAlt: 'Jeilees men\'s studio overshirt styled in rust brown' },
  { name: 'Sculpted Knit', collection: 'women', category: 'Knitwear / Women', price: '£180', image: '/images/products/women/sculpted-knit.jpg', fallbackImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85', imageAlt: 'Jeilees women\'s sculpted knit' },
  { name: 'The Bias Dress', collection: 'women', category: 'Dresses / Women', price: '£295', image: '/images/products/women/bias-dress.jpg', fallbackImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85', imageAlt: 'Jeilees women\'s bias dress' },
  { name: 'Pocket Overshirt', collection: 'kids', category: 'Play / Kids', price: '£95', image: '/images/products/kids/pocket-overshirt.jpg', fallbackImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85', imageAlt: 'Jeilees kids pocket overshirt' },
  { name: 'Weekend Set', collection: 'kids', category: 'Essentials / Kids', price: '£85', image: '/images/products/kids/weekend-set.jpg', fallbackImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85', imageAlt: 'Jeilees kids weekend set' },
]

export type ShopProduct = {
  name: string
  collection: CollectionKey
  category: string
  variant: string
  price: string
  originalPrice?: string
  image: string
  hoverImage?: string
  colors: string[]
  isNew?: boolean
}

export const shopProducts: ShopProduct[] = [
  // Men's products
  { name: 'Manjiro Sano Oversized Tee', collection: 'men', category: 'Layers', variant: 'Rust Brown', price: 'LKR 8,950.00', image: '/images/products/men/new1.jpeg', hoverImage: '/images/products/men/new2.jpeg', colors: ['#8B4513', '#1d1e1b', '#d8d4cb'], isNew: true },
  //{ name: 'The Flannel Check', collection: 'men', category: 'Shirts', variant: 'Charcoal Plaid', price: 'LKR 7,450.00', image: '/images/products/men/mcloth2.jpg', hoverImage: '/images/products/men/mcloth1.jpg', colors: ['#3d3d3d', '#8B4513', '#556B2F'] },
  //{ name: 'Essential Crew Tee', collection: 'men', category: 'Essentials', variant: 'Stone White', price: 'LKR 3,250.00', originalPrice: 'LKR 4,500.00', image: '/images/products/men/mcloths3.jpg', hoverImage: '/images/products/men/men1.jpg', colors: ['#f5f5f0', '#1d1e1b', '#716f69'] },
  //{ name: 'The Cargo Jogger', collection: 'men', category: 'Bottoms', variant: 'Olive', price: 'LKR 6,850.00', image: '/images/products/men/mcloths4.jpg', hoverImage: '/images/products/men/mcloths5.jpg', colors: ['#556B2F', '#1d1e1b', '#d8d4cb'], isNew: true },
  //{ name: 'Weekend Henley', collection: 'men', category: 'Knitwear', variant: 'Oatmeal', price: 'LKR 5,950.00', image: '/images/products/men/mcloths5.jpg', hoverImage: '/images/products/men/men2.jpg', colors: ['#d8d4cb', '#8B4513', '#1d1e1b'] },

  // Women's products
  { name: 'Anime printed Oversized tee', collection: 'women', category: 'Dresses', variant: 'Navy Floral', price: 'LKR 9,450.00', image: '/images/products/women/new1.jpeg', hoverImage: '/images/products/women/new2.jpeg', colors: ['#1a2744', '#8B4513', '#d4a76a'], isNew: true },
  { name: 'Epic Legends Oversized Tee', collection: 'women', category: 'Outerwear', variant: 'Light Wash', price: 'LKR 8,250.00', image: '/images/products/women/new3.jpeg', hoverImage: '/images/products/women/new4.jpeg', colors: ['#6c9dc6', '#1a2744', '#f5f5f0'] },
  { name: 'Mitsuri Oversized Tee', collection: 'women', category: 'Essentials', variant: 'Ivory', price: 'LKR 3,950.00', originalPrice: 'LKR 5,200.00', image: '/images/products/women/new5.jpeg', hoverImage: '/images/products/women/new6.jpeg', colors: ['#f5f5f0', '#1d1e1b', '#d4a76a'] },
  { name: 'Mitsuri Oversized Tee', collection: 'women', category: 'Footwear', variant: 'Tan Leather', price: 'LKR 5,750.00', image: '/images/products/women/new7.jpeg', hoverImage: '/images/products/women/new8.jpeg', colors: ['#c68b59', '#1d1e1b', '#f5f5f0'], isNew: true },

  // Kids products
  { name: 'Mini Explorer Jacket', collection: 'kids', category: 'Outerwear', variant: 'Forest Green', price: 'LKR 5,450.00', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=85', colors: ['#556B2F', '#1d1e1b', '#d8d4cb'], isNew: true },
  { name: 'Soft Play Tee', collection: 'kids', category: 'Essentials', variant: 'Sunshine Yellow', price: 'LKR 2,450.00', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=85', colors: ['#f0c75e', '#f5f5f0', '#6c9dc6'] },
  { name: 'Adventure Shorts', collection: 'kids', category: 'Bottoms', variant: 'Sand', price: 'LKR 3,250.00', originalPrice: 'LKR 4,200.00', image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85', colors: ['#d8d4cb', '#556B2F', '#6c9dc6'] },
  { name: 'Cozy Hoodie', collection: 'kids', category: 'Layers', variant: 'Dusty Pink', price: 'LKR 4,650.00', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85', colors: ['#d4a0a0', '#f5f5f0', '#1d1e1b'], isNew: true },
]

export const navItems = [{ label: 'Men', href: '/men' }, { label: 'Women', href: '/women' }, { label: 'Kids', href: '/kids' }, { label: 'Our story', href: '/about' }, { label: 'Contact', href: '/contact' }]

export const heroImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90'
export const storyImage = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
export const signatureImage = 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=2200&q=85'
export const heroSlides = [
  { image: heroImage, eyebrow: 'THE NEW COLLECTION', title: 'WEAR YOUR|IDENTITY.', description: 'A new uniform for the life you are making.', cta: 'Explore collection', href: '#collections' },
  { image: storyImage.replace('w=1200', 'w=2200'), eyebrow: 'THE SPRING EDIT', title: 'DRESS FOR|THE MOMENT.', description: 'Quietly expressive pieces for every version of your day.', cta: 'Discover the edit', href: '#collections' },
  { image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2200&q=90', eyebrow: 'WOMEN / 2025', title: 'MAKE IT|YOUR OWN.', description: 'Fluid forms and considered colour, made to move with you.', cta: "Explore women's", href: '/women' },
  { image: signatureImage, eyebrow: 'THE SIGNATURE SERIES', title: 'CREATE YOUR|OWN SIGNATURE.', description: 'Distinctive essentials with a point of view.', cta: 'Find your form', href: '#story' },
]
