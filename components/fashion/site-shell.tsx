'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, ChevronDown, ChevronRight, Menu, Music2, ShoppingBag, X } from 'lucide-react'
import { navItems, shopCategories, type NavItem } from '@/lib/fashion-data'
import { CartProvider, useCart } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { CartDrawer, CartToast } from './cart-drawer'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => setProgress((window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)) * 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, toggleDrawer } = useCart()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <>
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link href="/" className="wordmark">JEILEE’S<span>®</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <div key={item.href} className="desktop-nav-item">
            <Link href={item.href}>
              {item.label}
              {item.children && <ChevronDown size={10} className="desktop-nav-chevron" />}
            </Link>
            {item.children && (
              <div className="desktop-dropdown">
                <div className="desktop-dropdown-inner">
                  <div className="desktop-dropdown-feature">
                    <img
                      src={item.label === 'Shop' ? shopCategories[0]?.image : '/images/products/anime.jpeg'}
                      alt=""
                      aria-hidden="true"
                    />
                    <div className="desktop-dropdown-feature-copy">
                      <span>{item.label} / 01</span>
                      <strong>{item.label === 'Shop' ? 'The edit.' : 'Stories in motion.'}</strong>
                    </div>
                  </div>
                  <div className="desktop-dropdown-links">
                    <div className="desktop-dropdown-label">Browse {item.label.toLowerCase()}</div>
                    {item.children.map((child, index) => (
                      <Link key={child.href} href={child.href} className="desktop-dropdown-link">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {child.label}
                        <ArrowUpRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="nav-actions">
        <Link href="/account" className="nav-account">Account</Link>
        <Link href="/contact" className="nav-contact">Start a conversation <ArrowUpRight size={14} /></Link>
        <button className="nav-cart-btn" onClick={toggleDrawer} aria-label="Open shopping bag">
          <ShoppingBag size={19} />
          {count > 0 && <span className="nav-cart-badge">{count}</span>}
        </button>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
      </div>
    </header>
    <MobileMenu open={open} onClose={() => setOpen(false)} />
  </>
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (label: string) => setExpanded(prev => (prev === label ? null : label))

  // Close menu on route change
  useEffect(() => {
    if (!open) setExpanded(null)
  }, [open])

  return (
    <div className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`} aria-hidden={!open}>
      <div className="mobile-menu-top">
        <h2 className="mobile-menu-heading">MENU</h2>
        <button onClick={onClose} aria-label="Close menu"><X size={24} /></button>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.href} className="mobile-nav-group">
              <button
                className="mobile-nav-toggle"
                onClick={() => toggle(item.label)}
                aria-expanded={expanded === item.label}
              >
                <span>{item.label}</span>
                <ChevronRight
                  size={20}
                  className={`mobile-nav-arrow ${expanded === item.label ? 'mobile-nav-arrow-open' : ''}`}
                />
              </button>
              <div className={`mobile-nav-children ${expanded === item.label ? 'mobile-nav-children-open' : ''}`}>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} onClick={onClose} className="mobile-nav-child">
                    <span className="mobile-nav-dash">—</span> {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} onClick={onClose} className="mobile-nav-link">
              <span>{item.label}</span>
              <ChevronRight size={20} />
            </Link>
          )
        )}
        <Link href="/account" onClick={onClose} className="mobile-nav-link">
          <span>Account</span>
          <ChevronRight size={20} />
        </Link>
      </nav>
      <p className="mobile-menu-tagline">Clothing for considered lives.<br />Designed in London, worn everywhere.</p>
    </div>
  )
}

export function PageShell({ children, dark = false, className = '' }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className={`${dark ? 'site site-dark' : 'site'} ${className}`.trim()}>
          <ScrollProgress />
          <Navbar />
          {children}
          <BackToTop />
          <CartDrawer />
          <CartToast />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export function Button({ children, href = '#', light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return <Link href={href} className={`editorial-button ${light ? 'editorial-button-light' : ''}`}>{children}<ArrowUpRight size={15} /></Link>
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <button className={`back-top ${show ? 'back-top-show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
}

export function Footer() {
  const [joined, setJoined] = useState(false)
  return (
    <footer className="footer">
      <div className="footer-panel">
        <div className="footer-top">
          <div className="footer-brand-block">
            <p className="footer-statement">Clothing for considered<br />lives — made with care.</p>
            <p>© 2026 JEILEE’S STUDIO · <i>Clothing for considered lives.</i></p>
          </div>
          <div className="footer-link-group">
            <p className="eyebrow">Navigation</p>
            <Link href="/new-drop">New Drop</Link>
            {shopCategories.map((cat) => (
              <Link href={`/shop/${cat.key}`} key={cat.key}>{cat.label}</Link>
            ))}
            <Link href="/sale">Sale</Link>
          </div>
          <div className="footer-link-group">
            <p className="eyebrow">Support</p>
            <Link href="/contact">Contact Us</Link>
            <Link href="/account">My Account</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/our-story">Our Story</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Legal Notice</a>
          </div>
          <div className="newsletter">
            <p className="eyebrow">Get updates from JEILEE’S</p>
            {joined ? (
              <p className="joined"><Check size={15} /> You&apos;re on the list.</p>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setJoined(true) }}>
                <input aria-label="Email address" type="email" placeholder="Email address" required />
                <button aria-label="Subscribe">Subscribe</button>
              </form>
            )}
            <div className="footer-socials">
              <p className="eyebrow">Follow us</p>
              <div className="footer-social-links">
                <a href="#" aria-label="Instagram">
                  <svg aria-hidden="true" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok"><Music2 size={23} /></a>
                <a href="#" aria-label="Facebook">
                  <svg aria-hidden="true" width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                  </svg>
                </a>
                <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>
              </div>
            </div>
          </div>
        </div>
        <Link href="/" className="footer-wordmark" aria-label="JEILEE’S home">JEILEE’S</Link>
      </div>
    </footer>
  )
}
