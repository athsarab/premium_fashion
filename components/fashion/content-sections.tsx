'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, MoveUpRight, ShoppingBag } from 'lucide-react'
import { collections, shopProducts, shopCategories, getNewDropProducts, getSaleProducts, getCollectionProducts, type ShopProduct, type ShopCategory } from '@/lib/fashion-data'

import { useCart } from '@/lib/cart-context'
import { Button } from './site-shell'

/* ── Hero Carousel ──────────────────────────────────────── */
export function Hero({ eyebrow = 'THE NEW COLLECTION', title = <>WEAR YOUR<br /><i>IDENTITY.</i></>, description = 'A new uniform for the life you are making.', image, cta = 'Explore collection', href = '#collections', slides }: { eyebrow?: string; title?: React.ReactNode; description?: string; image: string; cta?: string; href?: string; slides?: Array<{ image: string; eyebrow: string; title: React.ReactNode; description: string; cta: string; href: string }> }) {
  const heroSlides = slides ?? [{ image, eyebrow, title, description, cta, href }]
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const currentSlide = heroSlides[activeSlide]

  useEffect(() => {
    if (heroSlides.length < 2 || isPaused) return
    const timer = window.setInterval(() => setActiveSlide((c) => (c + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(timer)
  }, [heroSlides.length, isPaused])

  const goToSlide = (i: number) => setActiveSlide((i + heroSlides.length) % heroSlides.length)

  return (
    <section className="hero" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={() => setIsPaused(false)}>
      <div className="hero-slides" aria-live="polite">
        {heroSlides.map((slide, i) => (
          <img key={slide.image} src={slide.image} alt="Jeilees fashion campaign" className={`hero-image ${i === activeSlide ? 'hero-image-active' : ''}`} aria-hidden={i !== activeSlide} />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-content" key={activeSlide}>
        <p className="eyebrow">{currentSlide.eyebrow}</p>
        <h1>
          {typeof currentSlide.title === 'string'
            ? currentSlide.title.split('|').map((line, i) => (
                <Fragment key={line}>{i > 0 && <br />} {i === 1 ? <i>{line}</i> : line}</Fragment>
              ))
            : currentSlide.title}
        </h1>
        <p className="hero-description">{currentSlide.description}</p>
        <div className="hero-actions">
          <Button href={currentSlide.href} light>{currentSlide.cta}</Button>
          <a href="#story" className="story-link">Discover the story <span>↓</span></a>
        </div>
      </div>
      {heroSlides.length > 1 && (
        <>
          <div className="hero-meta"><span>AW / 2025</span><span>0{activeSlide + 1} — 0{heroSlides.length}</span></div>
          <div className="hero-controls">
            <button type="button" onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous campaign image"><ChevronLeft size={18} /></button>
            <div className="hero-dots">
              {heroSlides.map((s, i) => (
                <button key={s.image} type="button" className={i === activeSlide ? 'hero-dot hero-dot-active' : 'hero-dot'} onClick={() => goToSlide(i)} aria-label={`Go to campaign image ${i + 1}`} aria-current={i === activeSlide ? 'true' : undefined} />
              ))}
            </div>
            <button type="button" onClick={() => goToSlide(activeSlide + 1)} aria-label="Next campaign image"><ChevronRight size={18} /></button>
          </div>
        </>
      )}
    </section>
  )
}

/* ── Editorial Intro ────────────────────────────────────── */
export function EditorialIntro() {
  return (
    <section className="intro section-pad" id="story">
      <div className="intro-copy">
        <p className="eyebrow">01 / THE Jeilees POINT OF VIEW</p>
        <h2>DESIGNED<br />FOR THE<br /><i>WAY YOU</i><br />MOVE.</h2>
      </div>
      <div className="intro-side">
        <p className="large-copy">We make clothes with a point of view. Quietly expressive pieces, considered down to the last stitch, for the lives you actually live.</p>
        <p className="body-copy">Jeilees is an independent fashion house built on the belief that getting dressed should feel like a form of self-knowledge. We design across generations, seasons, and the spaces between.</p>
        <Button href="/our-story">Our story</Button>
      </div>
    </section>
  )
}

/* ── New Drop Marquee ───────────────────────────────────── */
export function NewDropMarquee() {
  const newProducts = getNewDropProducts()
  if (newProducts.length === 0) return null
  const items = [...newProducts, ...newProducts, ...newProducts] // triple for seamless infinite loop

  return (
    <section className="new-drop-section">
      <div className="new-drop-header section-pad" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">02 / JUST LANDED</p>
            <h2>New<br /><i>arrivals.</i></h2>
          </div>
          <div className="section-head-right">
            <p className="section-note">Fresh pieces that just hit the floor.<br />Be the first to wear them.</p>
            <Button href="/new-drop">View all</Button>
          </div>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((product, i) => (
            <Link href="/new-drop" className="marquee-card" key={`${product.name}-${i}`}>
              <div className="marquee-card-image">
                <span className="shop-badge">NEW</span>
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <h3 className="marquee-card-name">{product.name}</h3>
              <p className="marquee-card-price">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Collection Spotlight ───────────────────────────────── */
export function CollectionSpotlight() {
  const collection = collections[0]
  if (!collection) return null
  const products = getCollectionProducts(collection.slug)

  return (
    <section className="spotlight" id="collections">
      <div className="spotlight-hero">
        <img src={collection.poster} alt={collection.name} className="spotlight-hero-img" />
        <div className="spotlight-overlay" />
        <div className="spotlight-text">
          <p className="eyebrow">FEATURED COLLECTION</p>
          <h2>ANIME<br /><i>EXTRAVAGANZA.</i></h2>
          <p className="spotlight-desc">{collection.description}</p>
          <Button href={`/collections/${collection.slug}`} light>Explore collection</Button>
        </div>
      </div>
      <div className="spotlight-products section-pad">
        <div className="section-head">
          <div>
            <p className="eyebrow">03 / FROM THE COLLECTION</p>
            <h2>Selected<br /><i>pieces.</i></h2>
          </div>
          <p className="section-note">A study in anime-inspired artistry<br />and premium streetwear construction.</p>
        </div>
        <div className="shop-grid">
          {products.slice(0, 4).map((product) => (
            <ShopCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Shop By Category ───────────────────────────────────── */
export function ShopByCategory() {
  const [hovered, setHovered] = useState<ShopCategory | null>(null)

  return (
    <section className="cat-browser section-pad">
      <div className="section-head">
        <div>
          <p className="eyebrow">04 / SHOP BY CATEGORY</p>
          <h2>Find your<br /><i>style.</i></h2>
        </div>
        <p className="section-note">Explore our curated categories,<br />each designed with intention.</p>
      </div>
      <div className="cat-grid">
        {shopCategories.map((cat) => (
          <Link
            key={cat.key}
            href={`/shop/${cat.key}`}
            className={`cat-tile ${hovered === cat.key ? 'cat-tile-active' : ''}`}
            onMouseEnter={() => setHovered(cat.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={cat.image} alt={cat.label} loading="lazy" />
            <div className="cat-tile-overlay" />
            <div className="cat-tile-content">
              <span className="cat-tile-eyebrow">{cat.label}</span>
              <p className="cat-tile-desc">{cat.description}</p>
              <span className="cat-tile-cta">Shop now <ArrowUpRight size={14} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ── Sale Strip ─────────────────────────────────────────── */
export function SaleStrip() {
  const saleProducts = getSaleProducts()
  if (saleProducts.length === 0) return null

  return (
    <section className="sale-strip">
      <div className="sale-strip-inner section-pad">
        <div className="sale-strip-head">
          <div>
            <p className="eyebrow">LIMITED TIME</p>
            <h2>On<br /><i>sale.</i></h2>
          </div>
          <Button href="/sale">View all sale</Button>
        </div>
        <div className="sale-strip-grid">
          {saleProducts.map((product) => (
            <ShopCard key={product.name} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── Signature Break ────────────────────────────────────── */
export function SignatureBreak() {
  return (
    <section className="signature">
      <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=85" alt="Jeilees signature campaign" />
      <div className="signature-overlay" />
      <div className="signature-content">
        <p className="eyebrow">THE SIGNATURE SERIES</p>
        <h2>CREATE YOUR<br /><i>OWN SIGNATURE.</i></h2>
        <Button href="/contact" light>Make it yours</Button>
      </div>
    </section>
  )
}

/* ── Shop Card ──────────────────────────────────────────── */
export function ShopCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart()
  return (
    <article className="shop-card">
      <div className="shop-card-image">
        {product.isNew && <span className="shop-badge">NEW</span>}
        {product.originalPrice && <span className="shop-badge shop-badge-sale">SALE</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.hoverImage && <img src={product.hoverImage} alt="" className="shop-card-hover-image" loading="lazy" aria-hidden="true" />}
        <div className="shop-card-overlay">
          <button className="shop-add-btn" onClick={() => addItem(product)} aria-label={`Add ${product.name} to bag`}>
            <ShoppingBag size={15} />
            <span>Add to bag</span>
          </button>
        </div>
      </div>
      <div className="shop-card-body">
        <span className="shop-card-logo">Jeilees<span>®</span></span>
        <div className="shop-card-swatches">
          {product.colors.map((color, i) => (
            <button key={i} className="shop-swatch" style={{ background: color }} aria-label={`Color option ${i + 1}`} />
          ))}
        </div>
        <h3 className="shop-card-name">{product.name}</h3>
        <p className="shop-card-variant">{product.variant}</p>
        <div className="shop-card-pricing">
          <span className="shop-card-price">{product.price}</span>
          {product.originalPrice && <span className="shop-card-original">{product.originalPrice}</span>}
        </div>
      </div>
    </article>
  )
}

/* ── Shop Showcase (reusable for any product set) ───────── */
export function ShopShowcase({ products, eyebrow, heading, note }: { products: ShopProduct[]; eyebrow?: string; heading?: React.ReactNode; note?: string }) {
 
  return (
    <section className="shop-showcase section-pad" id="shop">
      <div className="shop-showcase-head">
        <div>
          <p className="eyebrow">{eyebrow || 'THE COLLECTION'}</p>
          {heading || <h2>Shop the<br /><i>collection.</i></h2>}
        </div>
        <div className="shop-showcase-side">
          <p className="shop-showcase-note">{note || 'Hand-picked pieces designed for everyday expression.'}</p>
          <Button href="/shop">View all</Button>
        </div>
      </div>
      <div className="shop-grid">
        {products.map((product) => (
 
          <ShopCard key={product.name} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="shop-empty">
          <p className="large-copy">Coming soon.</p>
          <p className="body-copy">New pieces are being designed with care. Stay tuned.</p>
        </div>
      )}
    </section>
  )
}
