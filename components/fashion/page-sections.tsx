'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { shopProducts, shopCategories, collections, getProductsByCategory, getCollectionProducts, getNewDropProducts, getSaleProducts, getCollection, heroImage, type ShopCategory } from '@/lib/fashion-data'
import { Button, Footer, PageShell } from './site-shell'
import { Hero, SignatureBreak, ShopCard, ShopShowcase } from './content-sections'


/* ── Contact Form ───────────────────────────────────────── */
export function ContactForm() {
  const [sent, setSent] = useState(false)
  if (sent) return (
    <div className="success-state">
      <div><Check size={28} /></div>
      <h2>We&apos;ll be in touch.</h2>
      <p>Thank you for reaching out. Your message has found its way to us.</p>
      <button onClick={() => setSent(false)}>Send another message</button>
    </div>
  )
  return (
    <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <label>Name<input required name="name" placeholder="Your name" /></label>
      <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
      <label>Message<textarea required name="message" placeholder="Tell us a little more" rows={4} /></label>
      <button className="editorial-button" type="submit">Send message <ArrowUpRight size={15} /></button>
    </form>
  )
}

/* ── Shop All Page ──────────────────────────────────────── */
export function ShopAllPage() {
  return (
    <PageShell>
      <main>
        <Hero
          eyebrow="THE SHOP"
          title={<>FIND YOUR<br /><i>FORM.</i></>}
          description="Explore our complete collection of considered clothing."
          image={heroImage}
          cta="Browse all"
          href="#shop"
        />
        <ShopFilteredContent />
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

function ShopFilteredContent() {
  const [active, setActive] = useState<ShopCategory | 'all'>('all')
  const filtered = active === 'all' ? shopProducts : getProductsByCategory(active)


  return (
    <section className="shop-page section-pad" id="shop">
      <div className="shop-page-head">
        <p className="eyebrow">SHOP / {active === 'all' ? 'ALL' : active.toUpperCase()}</p>
        <h2>Shop the<br /><i>edit.</i></h2>
      </div>
      <div className="shop-filters">
        <button className={`shop-filter-btn ${active === 'all' ? 'shop-filter-active' : ''}`} onClick={() => setActive('all')}>All</button>
        {shopCategories.map((cat) => (
          <button key={cat.key} className={`shop-filter-btn ${active === cat.key ? 'shop-filter-active' : ''}`} onClick={() => setActive(cat.key)}>{cat.label}</button>
        ))}
      </div>
      <div className="shop-grid">
        {filtered.map((product) => (
          <ShopCard key={product.name} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="shop-empty">
          <p className="large-copy">Coming soon.</p>
          <p className="body-copy">New pieces in this category are being designed with care.</p>
        </div>
      )}
    </section>
  )
}

/* ── Shop Category Page ─────────────────────────────────── */
export function ShopCategoryPage({ category }: { category: ShopCategory }) {
  const catData = shopCategories.find((c) => c.key === category)
  const products = getProductsByCategory(category)

  return (
    <PageShell>
      <main>
        <Hero
          eyebrow={`SHOP / ${(catData?.label || category).toUpperCase()}`}
          title={<>{catData?.label || category}<br /><i>collection.</i></>}
          description={catData?.description || 'Explore this category.'}
          image={catData?.image || heroImage}
          cta={`Shop ${catData?.label || category}`}
          href="#shop"
        />
        <ShopShowcase
          products={products}
          eyebrow={`SHOP / ${(catData?.label || category).toUpperCase()}`}
          heading={<h2>Shop<br /><i>{catData?.label || category}.</i></h2>}
          note={catData?.description}
        />
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── Collection List Page ───────────────────────────────── */
export function CollectionListPage() {
  return (
    <PageShell>
      <main>
        <Hero
          eyebrow="ALL COLLECTIONS"
          title={<>OUR<br /><i>COLLECTIONS.</i></>}
          description="Curated drops. Limited editions. Every collection tells a story."
          image={collections[0]?.poster || heroImage}
          cta="Explore"
          href="#collections"
        />
        <section className="collections-list section-pad" id="collections">
          <div className="section-head">
            <div>
              <p className="eyebrow">COLLECTIONS</p>
              <h2>Explore<br /><i>the drops.</i></h2>
            </div>
            <p className="section-note">Each collection is a chapter<br />in our ongoing story.</p>
          </div>
          <div className="collections-grid">
            {collections.map((collection) => {
              const products = getCollectionProducts(collection.slug)
              return (
                <Link key={collection.slug} href={`/collections/${collection.slug}`} className="collection-card">
                  <div className="collection-card-image">
                    <img src={collection.image} alt={collection.name} />
                    <div className="collection-card-overlay" />
                    <div className="collection-card-content">
                      <p className="eyebrow">{products.length} PIECES</p>
                      <h3>{collection.name}</h3>
                      <p>{collection.description}</p>
                      <span className="collection-card-cta">Explore collection <ArrowUpRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── Collection Detail Page ─────────────────────────────── */
export function CollectionDetailPage({ slug }: { slug: string }) {
  const collection = getCollection(slug)
  const products = getCollectionProducts(slug)

  if (!collection) {
    return (
      <PageShell>
        <main>
          <Hero eyebrow="COLLECTION NOT FOUND" title={<>COMING<br /><i>SOON.</i></>} description="This collection hasn't dropped yet." image={heroImage} cta="Browse shop" href="/shop" />
          <Footer />
        </main>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <main>
        <Hero
          eyebrow={`COLLECTION / ${collection.name.toUpperCase()}`}
          title={<>{collection.name.split(' ').slice(0, 2).join(' ')}<br /><i>{collection.name.split(' ').slice(2).join(' ') || 'Drop.'}</i></>}
          description={collection.description}
          image={collection.poster}
          cta="Shop collection"
          href="#shop"
        />
        <section className="collection-story section-pad">
          <div className="collection-intro">
            <div>
              <p className="eyebrow">THE STORY</p>
              <h2>{collection.name}</h2>
            </div>
            <p className="large-copy">{collection.longDescription}</p>
          </div>
        </section>
        <ShopShowcase
          products={products}
          eyebrow={`${collection.name.toUpperCase()} / ${products.length} PIECES`}
          heading={<h2>Shop the<br /><i>collection.</i></h2>}
          note={collection.description}
        />
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── New Drop Page ──────────────────────────────────────── */
export function NewDropPage() {
  const products = getNewDropProducts()

  return (
    <PageShell>
      <main>
        <Hero
          eyebrow="JUST LANDED"
          title={<>NEW<br /><i>DROP.</i></>}
          description="The latest arrivals. Fresh pieces that just hit the floor."
          image={products[0]?.image || heroImage}
          cta="Shop new"
          href="#shop"
        />
        <ShopShowcase
          products={products}
          eyebrow={`NEW DROP / ${products.length} PIECES`}
          heading={<h2>Just<br /><i>landed.</i></h2>}
          note="Be the first to wear these new arrivals."
        />
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── Sale Page ──────────────────────────────────────────── */
export function SalePage() {
  const products = getSaleProducts()

  return (
    <PageShell>
      <main>
        <Hero
          eyebrow="LIMITED TIME"
          title={<>ON<br /><i>SALE.</i></>}
          description="Selected pieces at special prices. While they last."
          image={products[0]?.image || heroImage}
          cta="Shop sale"
          href="#shop"
        />
        <ShopShowcase
          products={products}
          eyebrow={`SALE / ${products.length} PIECES`}
          heading={<h2>Selected<br /><i>reductions.</i></h2>}
          note="Premium pieces at considered prices."
        />
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── Our Story Page ─────────────────────────────────────── */
export function OurStoryPage() {
  return (
    <PageShell>
      <main>
        <Hero
          eyebrow="OUR STORY / EST. 2018"
          title={<>THE STORY<br /><i>BEHIND THE STITCH.</i></>}
          description="How Jeilees became a voice in considered fashion."
          image="https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=2200&q=85"
          cta="Read our story"
          href="#about-story"
        />
        <section className="about-story section-pad" id="about-story">
          <p className="eyebrow">01 / OUR PHILOSOPHY</p>
          <h2>FASHION ISN&apos;T<br />JUST WHAT YOU WEAR.<br /><i>IT&apos;S HOW YOU MOVE</i><br />THROUGH THE WORLD.</h2>
          <div className="about-grid">
            <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=85" alt="Jeilees studio portrait" />
            <p className="large-copy">
              We believe in clothes that stay with you. In a world of more, we choose better: precise cuts, honest materials, and a slower kind of ambition.
              <br /><br />
              <span className="body-copy">Our collections are designed in London and made with a small, trusted network of makers. We are interested in the tension between utility and beauty — the things you need, made extraordinary.</span>
            </p>
          </div>
        </section>
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── About Page ─────────────────────────────────────────── */
export function AboutPage() {
  return (
    <PageShell>
      <main>
        <Hero
          eyebrow="ABOUT US"
          title={<>CLOTHES WITH<br /><i>A POINT OF VIEW.</i></>}
          description="An independent fashion house for considered lives."
          image="https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=2200&q=85"
          cta="Learn more"
          href="#about-story"
        />
        <section className="about-story section-pad" id="about-story">
          <p className="eyebrow">01 / WHO WE ARE</p>
          <h2>FASHION ISN&apos;T<br />JUST WHAT YOU WEAR.<br /><i>IT&apos;S HOW YOU MOVE</i><br />THROUGH THE WORLD.</h2>
          <div className="about-grid">
            <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=85" alt="Jeilees studio portrait" />
            <p className="large-copy">
              We believe in clothes that stay with you. In a world of more, we choose better: precise cuts, honest materials, and a slower kind of ambition.
              <br /><br />
              <span className="body-copy">Our collections are designed in London and made with a small, trusted network of makers. We are interested in the tension between utility and beauty — the things you need, made extraordinary.</span>
            </p>
          </div>
        </section>
        <SignatureBreak />
        <Footer />
      </main>
    </PageShell>
  )
}

/* ── Contact Page ───────────────────────────────────────── */
export function ContactPage() {
  return (
    <PageShell dark>
      <main>
        <section className="contact-hero">
          <p className="eyebrow">GET IN TOUCH</p>
          <h1>LET&apos;S<br /><i>TALK.</i></h1>
          <p>For press, partnerships, stockists, or simply to say hello.</p>
        </section>
        <section className="contact-body section-pad">
          <div>
            <p className="eyebrow">02 / START A CONVERSATION</p>
            <h2>Tell us<br /><i>everything.</i></h2>
            <p className="body-copy">We read every message. Share a thought, a project, or a question and we&apos;ll get back to you soon.</p>
          </div>
          <ContactForm />
        </section>
        <Footer />
      </main>
    </PageShell>
  )
}
