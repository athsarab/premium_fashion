export type ShopProduct = {
  name: string
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
  { name: 'Manjiro Sano Oversized Tee', category: 'Oversized Tees', variant: 'Rust Brown', price: 'LKR 8,950.00', image: '/images/products/men/new1.jpeg', hoverImage: '/images/products/men/new2.jpeg', colors: ['#8B4513', '#1d1e1b', '#d8d4cb'], isNew: true },
  { name: 'Anime Printed Oversized Tee', category: 'Oversized Tees', variant: 'Navy Floral', price: 'LKR 9,450.00', image: '/images/products/women/new1.jpeg', hoverImage: '/images/products/women/new2.jpeg', colors: ['#1a2744', '#8B4513', '#d4a76a'], isNew: true },
  { name: 'Epic Legends Oversized Tee', category: 'Oversized Tees', variant: 'Light Wash', price: 'LKR 8,250.00', image: '/images/products/women/new3.jpeg', hoverImage: '/images/products/women/new4.jpeg', colors: ['#6c9dc6', '#1a2744', '#f5f5f0'] },
  { name: 'Manjiro Sano Oversized Tee — Ladies', category: 'Oversized Tees', variant: 'Ivory', price: 'LKR 3,950.00', originalPrice: 'LKR 5,200.00', image: '/images/products/women/new5.jpeg', hoverImage: '/images/products/women/new6.jpeg', colors: ['#f5f5f0', '#1d1e1b', '#d4a76a'] },
  { name: 'Mitsuri Oversized Tee', category: 'Oversized Tees', variant: 'Tan Leather', price: 'LKR 5,750.00', image: '/images/products/women/new7.jpeg', hoverImage: '/images/products/women/new8.jpeg', colors: ['#c68b59', '#1d1e1b', '#f5f5f0'], isNew: true },
]

export const currentCollection = {
  name: 'Anime Extravaganza 1.0',
  tagline: 'Where anime meets streetwear.',
  description: 'Bold graphics. Premium fabric. A limited drop of anime-inspired oversized tees designed for those who wear their fandom with confidence.',
}

export const navItems = [
  { label: 'Collection', href: '#shop' },
  { label: 'Our story', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const heroImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90'
export const storyImage = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
export const signatureImage = 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=2200&q=85'

export const heroSlides = [
  { image: heroImage, eyebrow: 'ANIME EXTRAVAGANZA 1.0', title: 'WEAR YOUR|FANDOM.', description: 'A limited drop of anime-inspired streetwear. Bold prints, premium fabric.', cta: 'Shop the drop', href: '#shop' },
  { image: storyImage.replace('w=1200', 'w=2200'), eyebrow: 'Anime Extravaganza 1.0', title: 'DRESS FOR|THE CULTURE.', description: 'Oversized tees that bridge the gap between anime and everyday style.', cta: 'Explore now', href: '#shop' },
  { image: signatureImage, eyebrow: 'LIMITED EDITION', title: 'CREATE YOUR|OWN SIGNATURE.', description: 'Distinctive essentials with a point of view. Made for those who stand out.', cta: 'Find your form', href: '#story' },
]
