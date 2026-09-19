'use client'

import { Fragment, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, MoveUpRight, ShoppingBag } from 'lucide-react'
import { shopProducts, currentCollection, type ShopProduct } from '@/lib/fashion-data'
import { useCart } from '@/lib/cart-context'
import { Button } from './site-shell'

export function Hero({ eyebrow = 'THE NEW COLLECTION', title = <>WEAR YOUR<br /><i>IDENTITY.</i></>, description = 'A new uniform for the life you are making.', image, cta = 'Explore collection', href = '#collections', slides }: { eyebrow?: string, title?: React.ReactNode, description?: string, image: string, cta?: string, href?: string, slides?: Array<{ image: string, eyebrow: string, title: React.ReactNode, description: string, cta: string, href: string }> }) {
  const heroSlides = slides ?? [{ image, eyebrow, title, description, cta, href }]
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const currentSlide = heroSlides[activeSlide]

  useEffect(() => {
    if (heroSlides.length < 2 || isPaused) return
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(timer)
  }, [heroSlides.length, isPaused])

  const goToSlide = (index: number) => setActiveSlide((index + heroSlides.length) % heroSlides.length)

  return <section className="hero" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={() => setIsPaused(false)}><div className="hero-slides" aria-live="polite">{heroSlides.map((slide, index) => <img key={slide.image} src={slide.image} alt="Jeilees fashion campaign" className={`hero-image ${index === activeSlide ? 'hero-image-active' : ''}`} aria-hidden={index !== activeSlide} />)}</div><div className="hero-shade" /><div className="hero-content" key={activeSlide}><p className="eyebrow">{currentSlide.eyebrow}</p><h1>{typeof currentSlide.title === 'string' ? currentSlide.title.split('|').map((line, index) => <Fragment key={line}>{index > 0 && <br />} {index === 1 ? <i>{line}</i> : line}</Fragment>) : currentSlide.title}</h1><p className="hero-description">{currentSlide.description}</p><div className="hero-actions"><Button href={currentSlide.href} light>{currentSlide.cta}</Button><a href="#story" className="story-link">Discover the story <span>↓</span></a></div></div>{heroSlides.length > 1 && <><div className="hero-meta"><span>AW / 2025</span><span>0{activeSlide + 1} — 0{heroSlides.length}</span></div><div className="hero-controls"><button type="button" onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous campaign image"><ChevronLeft size={18} /></button><div className="hero-dots">{heroSlides.map((slide, index) => <button key={slide.image} type="button" className={index === activeSlide ? 'hero-dot hero-dot-active' : 'hero-dot'} onClick={() => goToSlide(index)} aria-label={`Go to campaign image ${index + 1}`} aria-current={index === activeSlide ? 'true' : undefined} />)}</div><button type="button" onClick={() => goToSlide(activeSlide + 1)} aria-label="Next campaign image"><ChevronRight size={18} /></button></div></>}</section>
}

export function EditorialIntro() {
  return (
    <section className="intro section-pad" id="story">
      <div className="intro-copy">
        <p className="eyebrow">01 / {currentCollection.name.toUpperCase()}</p>
        <h2>
          BOLD<br />PRINTS.<br /><i>PREMIUM</i><br />FABRIC.
        </h2>
      </div>
      <div className="intro-side">
        <p className="large-copy">{currentCollection.description}</p> 
        <p className="body-copy">
          Jeilees is an independent fashion label built on the belief that what you wear should tell your story. We design across fandoms, cultures, and the spaces between — creating pieces that feel personal.
        </p>
        <Button href="#shop">Shop the drop</Button>
      </div>
    </section>
  )
}

export function SignatureBreak() { return <section className="signature"><img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=85" alt="Jeilees signature campaign" /><div className="signature-overlay" /><div className="signature-content"><p className="eyebrow">THE SIGNATURE SERIES</p><h2>CREATE YOUR<br /><i>OWN SIGNATURE.</i></h2><Button href="/contact" light>Make it yours</Button></div></section> }

function ShopCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart()
  return (
    <article className="shop-card">
      <div className="shop-card-image">
        {product.isNew && <span className="shop-badge">NEW</span>}
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

export function ShopShowcase() {
  return (
    <section className="shop-showcase section-pad" id="shop">
      <div className="shop-showcase-head">
        <div>
          <p className="eyebrow">SHOP / {currentCollection.name.toUpperCase()}</p>
          <h2>
            Shop the<br /><i>drop.</i>
          </h2>
        </div>
        <div className="shop-showcase-side">
          <p className="shop-showcase-note">
            {currentCollection.tagline} Limited pieces, unlimited expression.
          </p>
          <Button href="/contact">Get in touch</Button>
        </div>
      </div>
      <div className="shop-grid">
        {shopProducts.map((product) => (
          <ShopCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}
