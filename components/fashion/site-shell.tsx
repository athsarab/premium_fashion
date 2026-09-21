'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, ChevronRight, Menu, ShoppingBag, X } from 'lucide-react'
import { navItems, shopCategories, type NavItem } from '@/lib/fashion-data'
import { CartProvider, useCart } from '@/lib/cart-context'
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
      <Link href="/" className="wordmark">Jeilees<span>®</span></Link>
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
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="desktop-dropdown-link">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="nav-actions">
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
      </nav>
      <p className="mobile-menu-tagline">Clothing for considered lives.<br />Designed in London, worn everywhere.</p>
    </div>
  )
}

export function PageShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <CartProvider>
      <div className={dark ? 'site site-dark' : 'site'}>
        <ScrollProgress />
        <Navbar />
        {children}
        <BackToTop />
        <CartDrawer />
        <CartToast />
      </div>
    </CartProvider>
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
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-mark">Jeilees<span>®</span></Link>
          <p>Clothing for considered lives.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="eyebrow">Shop</p>
            <Link href="/new-drop">New Drop</Link>
            {shopCategories.map((cat) => (
              <Link href={`/shop/${cat.key}`} key={cat.key}>{cat.label}</Link>
            ))}
            <Link href="/sale">Sale</Link>
          </div>
          <div>
            <p className="eyebrow">Follow</p>
            {['Instagram', 'Facebook', 'TikTok', 'Pinterest'].map((social) => (
              <a href="#" key={social}>{social}</a>
            ))}
          </div>
        </div>
        <div className="newsletter">
          <p className="eyebrow">Join the list</p>
          {joined ? (
            <p className="joined"><Check size={15} /> You&apos;re on the list.</p>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setJoined(true) }}>
              <input aria-label="Email address" type="email" placeholder="Email address" required />
              <button aria-label="Subscribe"><ArrowUpRight size={18} /></button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Jeilees STUDIO</span>
        <span>Made for movement</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </div>
    </footer>
  )
}
