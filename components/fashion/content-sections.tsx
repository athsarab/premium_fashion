'use client'

import { useState } from 'react'
import { MoveUpRight } from 'lucide-react'
import { collections, products, shopProducts, type CollectionKey, type ShopProduct } from '@/lib/fashion-data'
import { Button } from './site-shell'
import { ProductImage } from './product-image'

export function Hero({ eyebrow = 'THE NEW COLLECTION', title = <>WEAR YOUR<br /><i>IDENTITY.</i></>, description = 'A new uniform for the life you are making.', image, cta = 'Explore collection', href = '#collections' }: { eyebrow?: string, title?: React.ReactNode, description?: string, image: string, cta?: string, href?: string }) {
  return <section className="hero"><img src={image} alt="VERRA fashion campaign" className="hero-image" /><div className="hero-shade" /><div className="hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-description">{description}</p><div className="hero-actions"><Button href={href} light>{cta}</Button><a href="#story" className="story-link">Discover the story <span>↓</span></a></div></div><div className="hero-meta"><span>AW / 2025</span><span>01 — 05</span></div></section>
}

export function EditorialIntro() { return <section className="intro section-pad" id="story"><div className="intro-copy"><p className="eyebrow">01 / THE VERRA POINT OF VIEW</p><h2>DESIGNED<br />FOR THE<br /><i>WAY YOU</i><br />MOVE.</h2></div><div className="intro-side"><p className="large-copy">We make clothes with a point of view. Quietly expressive pieces, considered down to the last stitch, for the lives you actually live.</p><p className="body-copy">VERRA is an independent fashion house built on the belief that getting dressed should feel like a form of self-knowledge. We design across generations, seasons, and the spaces between.</p><Button href="/about">Our story</Button></div></section> }

export function CollectionChapter({ collection, index }: { collection: CollectionKey, index: number }) { const collectionData = collections[collection]; return <section className={`chapter chapter-${collection}`}><div className="chapter-image-wrap"><img src={collectionData.image} alt={collectionData.label} className="chapter-image" /><span className="image-index">0{index} / 03</span></div><div className="chapter-copy"><p className="eyebrow">{collectionData.label}</p><h2>{collectionData.title}</h2><p>{collectionData.description}</p><Button href={`/${collection}`}>Explore {collection}</Button></div></section> }

export function Featured() { return <section className="featured section-pad"><div className="section-head"><div><p className="eyebrow">02 / THE EDIT</p><h2>Selected<br /><i>forms.</i></h2></div><p className="section-note">A study in texture, proportion,<br />and the beautiful everyday.</p></div><div className="product-grid">{products.slice(0, 3).map((product) => <article className="product-card" key={product.name}><div className="product-image"><ProductImage src={product.image} fallback={product.fallbackImage} alt={product.imageAlt} /><span>View piece</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{product.price}</strong></div></article>)}</div></section> }

export function CategoryBrowser() { const [active, setActive] = useState<CollectionKey>('women'); const collectionData = collections[active]; return <section className="browser section-pad"><div className="browser-image"><img key={active} src={collectionData.poster} alt={`${active} collection`} /><div className="browser-caption"><span>VERRA / {active.toUpperCase()}</span><span>01—03</span></div></div><div className="browser-list"><p className="eyebrow">03 / FIND YOUR FORM</p>{(Object.keys(collections) as CollectionKey[]).map((key, i) => <button key={key} className={active === key ? 'browser-item active' : 'browser-item'} onMouseEnter={() => setActive(key)} onFocus={() => setActive(key)} onClick={() => setActive(key)}><span>0{i + 1}</span><strong>{key}</strong><MoveUpRight size={20} /></button>)}<p className="browser-detail">Every collection is designed as a conversation between the body and the world around it.</p></div></section> }

export function SignatureBreak() { return <section className="signature"><img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=85" alt="VERRA signature campaign" /><div className="signature-overlay" /><div className="signature-content"><p className="eyebrow">THE SIGNATURE SERIES</p><h2>CREATE YOUR<br /><i>OWN SIGNATURE.</i></h2><Button href="/contact" light>Make it yours</Button></div></section> }

function ShopCard({ product }: { product: ShopProduct }) {
  return (
    <article className="shop-card">
      <div className="shop-card-image">
        {product.isNew && <span className="shop-badge">NEW</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="shop-card-overlay">
          <span>Quick view</span>
        </div>
      </div>
      <div className="shop-card-body">
        <div className="shop-card-swatches">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className="shop-swatch"
              style={{ background: color }}
              aria-label={`Color option ${i + 1}`}
            />
          ))}
        </div>
        <h3 className="shop-card-name">{product.name}</h3>
        <p className="shop-card-variant">{product.variant}</p>
        <div className="shop-card-pricing">
          <span className="shop-card-price">{product.price}</span>
          {product.originalPrice && (
            <span className="shop-card-original">{product.originalPrice}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export function ShopShowcase({ collection }: { collection: CollectionKey }) {
  const collectionProducts = shopProducts.filter((p) => p.collection === collection)
  const collectionLabel = collection === 'men' ? "Men's" : collection === 'women' ? "Women's" : 'Kids'
  return (
    <section className="shop-showcase section-pad" id="shop">
      <div className="shop-showcase-head">
        <div>
          <p className="eyebrow">SHOP / {collectionLabel.toUpperCase()} COLLECTION</p>
          <h2>
            Shop the<br /><i>collection.</i>
          </h2>
        </div>
        <div className="shop-showcase-side">
          <p className="shop-showcase-note">
            Hand-picked pieces designed for everyday expression.
          </p>
          <Button href="/contact">View all</Button>
        </div>
      </div>
      <div className="shop-grid">
        {collectionProducts.map((product) => (
          <ShopCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}
