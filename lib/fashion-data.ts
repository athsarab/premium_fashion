// ── Category System ─────────────────────────────────────
export type ShopCategory = 'basics' | 'tops' | 'bottoms' | 'dresses' | 'skirts'

export const shopCategories: { key: ShopCategory; label: string; description: string; image: string }[] = [
  { key: 'basics', label: 'Basics', description: 'Essential foundations for every wardrobe.', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=85' },

  { key: 'tops', label: 'Tops', description: 'Statement pieces and everyday favorites.', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=85' },
  { key: 'bottoms', label: 'Bottoms', description: 'From tailored trousers to relaxed fits.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85' },
  { key: 'dresses', label: 'Dresses', description: 'Fluid forms for every occasion.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85' },
  { key: 'skirts', label: 'Skirts', description: 'Movement and grace in every step.', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=85' },
]

// ── Collection System ───────────────────────────────────
export type Collection = {
  slug: string
  name: string
  description: string
  longDescription: string
  image: string
  poster: string
}

export const collections: Collection[] = [
  {
    slug: 'anime-extravaganza-1-0',
    name: 'Anime Extravaganza 1.0',
    description: 'Where anime meets streetwear. Bold prints, expressive designs, limitless identity.',
    longDescription: 'The first collection from JEILEE’S that celebrates modern fashion with the captivating world of anime. Explore a world where oversized tees turn into art, adorned with iconic characters from beloved series such as Demon Slayer, Blue Lock, Tokyo Revengers and more. Anime Extravaganza 1.0 makes it possible to express your passion for both fashion and anime like never before. Immerse yourself in an explosion of style stories.',
    image: '/images/products/women/new1.jpeg',
    poster: '/images/products/anime.jpeg',
  },
]

// ── Product Type ────────────────────────────────────────
export type ShopProduct = {
  name: string
  category: ShopCategory
  collectionSlug?: string
 main
  variant: string
  price: string
  originalPrice?: string
  image: string
  hoverImage?: string
  colors: string[]
  isNew?: boolean
}

export const shopProducts: ShopProduct[] = [
  // ── Anime Extravaganza 1.0 Collection ──
  { name: 'Manjiro Sano Oversized Tee', category: 'basics', collectionSlug: 'anime-extravaganza-1-0', variant: 'Rust Brown', price: 'LKR 8,950.00', image: '/images/products/men/new1.jpeg', hoverImage: '/images/products/men/new2.jpeg', colors: ['#8B4513', '#1d1e1b', '#d8d4cb'], isNew: true },
  { name: 'Anime Printed Oversized Tee', category: 'basics', collectionSlug: 'anime-extravaganza-1-0', variant: 'Navy Floral', price: 'LKR 9,450.00', image: '/images/products/women/new1.jpeg', hoverImage: '/images/products/women/new2.jpeg', colors: ['#1a2744', '#8B4513', '#d4a76a'], isNew: true },
  { name: 'Epic Legends Oversized Tee', category: 'basics', collectionSlug: 'anime-extravaganza-1-0', variant: 'Light Wash', price: 'LKR 8,250.00', image: '/images/products/women/new3.jpeg', hoverImage: '/images/products/women/new4.jpeg', colors: ['#6c9dc6', '#1a2744', '#f5f5f0'], isNew: true  },
  { name: 'Manjiro Sano Drop-Shoulder Tee', category: 'basics', collectionSlug: 'anime-extravaganza-1-0', variant: 'Ivory', price: 'LKR 3,950.00', originalPrice: 'LKR 5,200.00', image: '/images/products/women/new5.jpeg', hoverImage: '/images/products/women/new6.jpeg', colors: ['#f5f5f0', '#1d1e1b', '#d4a76a'] , isNew: true },
  { name: 'Mitsuri Oversized Tee', category: 'basics', collectionSlug: 'anime-extravaganza-1-0', variant: 'Tan Leather', price: 'LKR 5,750.00', image: '/images/products/women/new7.jpeg', hoverImage: '/images/products/women/new8.jpeg', colors: ['#c68b59', '#1d1e1b', '#f5f5f0'], isNew: true },
  // ── General Catalog ──
 // { name: 'Mini Explorer Jacket', category: 'tops', variant: 'Forest Green', price: 'LKR 5,450.00', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=85', colors: ['#556B2F', '#1d1e1b', '#d8d4cb'], isNew: true },

 // { name: 'Adventure Shorts', category: 'bottoms', variant: 'Sand', price: 'LKR 3,250.00', originalPrice: 'LKR 4,200.00', image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85', colors: ['#d8d4cb', '#556B2F', '#6c9dc6'] },
 // { name: 'Cozy Hoodie', category: 'tops', variant: 'Dusty Pink', price: 'LKR 4,650.00', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85', hoverImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85', colors: ['#d4a0a0', '#f5f5f0', '#1d1e1b'], isNew: true },
]

// ── Navigation ──────────────────────────────────────────
export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const navItems: NavItem[] = [
  { label: 'New Drop', href: '/new-drop' },
  {
    label: 'Shop', href: '/shop',
    children: shopCategories.map(c => ({ label: c.label, href: `/shop/${c.key}` })),
  },
  {
    label: 'Collections', href: '/collections',
    children: collections.map(c => ({ label: c.name, href: `/collections/${c.slug}` })),
  },
  { label: 'Sale', href: '/sale' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'About Us', href: '/about' },
]

// ── Hero Data ───────────────────────────────────────────

export const heroImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90'
export const storyImage = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
export const signatureImage = 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=2200&q=85'

export const heroSlides = [
  { image: heroImage, eyebrow: 'THE NEW DROP', title: 'YOUR EVERYDAY|ELEVATED.', description: 'A new uniform for the life you are making.', cta: 'Shop new arrivals', href: '/new-drop' },
  { image: '/images/products/women/new3.jpeg', eyebrow: 'ANIME EXTRAVAGANZA 1.0', title: 'EXPRESS|YOUR SOUL.', description: 'Where anime meets streetwear. Bold prints, limitless expression.', cta: 'Explore collection', href: '/collections/anime-extravaganza-1-0' },
  { image: storyImage.replace('w=1200', 'w=2200'), eyebrow: 'SHOP THE EDIT', title: 'MAKE IT|YOUR OWN.', description: 'Curated pieces for every version of your day.', cta: 'Shop now', href: '/shop' },
  { image: signatureImage, eyebrow: 'THE SIGNATURE SERIES', title: 'DRESS DIFFERENT|FEEL DIFFERENT.', description: 'Distinctive essentials with a point of view.', cta: 'Find your form', href: '#story' },
]

// ── Helper Functions ────────────────────────────────────
export function getProductsByCategory(category: ShopCategory): ShopProduct[] {
  return shopProducts.filter(p => p.category === category)
}

export function getCollectionProducts(slug: string): ShopProduct[] {
  return shopProducts.filter(p => p.collectionSlug === slug)
}

export function getNewDropProducts(): ShopProduct[] {
  return shopProducts.filter(p => p.isNew)
}

export function getSaleProducts(): ShopProduct[] {
  return shopProducts.filter(p => p.originalPrice)
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug)
}
