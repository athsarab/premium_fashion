'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Menu, MoveUpRight, ShoppingBag, X } from 'lucide-react'
import { navItems } from '@/lib/fashion-data'
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
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
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

function MobileMenu({ open, onClose }: { open: boolean, onClose: () => void }) {
  return <div className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`} aria-hidden={!open}>
    <div className="mobile-menu-top"><span className="wordmark">Jeilees<span>®</span></span><button onClick={onClose} aria-label="Close menu"><X size={24} /></button></div>
    <nav aria-label="Mobile navigation">{navItems.map((item, i) => <Link key={item.href} href={item.href} onClick={onClose}><span>0{i + 1}</span>{item.label}<MoveUpRight size={20} /></Link>)}</nav>
    <p>Clothing for considered lives.<br />Designed in London, worn everywhere.</p>
  </div>
}

export function PageShell({ children, dark = false }: { children: React.ReactNode, dark?: boolean }) {
  return <CartProvider><div className={dark ? 'site site-dark' : 'site'}><ScrollProgress /><Navbar />{children}<BackToTop /><CartDrawer /><CartToast /></div></CartProvider>
}

export function Button({ children, href = '#', light = false }: { children: React.ReactNode, href?: string, light?: boolean }) {
  return <Link href={href} className={`editorial-button ${light ? 'editorial-button-light' : ''}`}>{children}<ArrowUpRight size={15} /></Link>
}

export function Reveal({ children, className = '' }: { children: React.ReactNode, className?: string }) {
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
  return <footer className="footer"><div className="footer-top"><div><Link href="/" className="footer-mark">Jeilees<span>®</span></Link><p>Clothing for considered lives.</p></div><div className="footer-links"><div><p className="eyebrow">Explore</p>{navItems.slice(0, 4).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div><div><p className="eyebrow">Follow</p>{['Instagram', 'Facebook', 'TikTok', 'Pinterest'].map((social) => <a href="#" key={social}>{social}</a>)}</div></div><div className="newsletter"><p className="eyebrow">Join the list</p>{joined ? <p className="joined"><Check size={15} /> You&apos;re on the list.</p> : <form onSubmit={(event) => { event.preventDefault(); setJoined(true) }}><input aria-label="Email address" type="email" placeholder="Email address" required /><button aria-label="Subscribe"><ArrowUpRight size={18} /></button></form>}</div></div><div className="footer-bottom"><span>© 2025 Jeilees STUDIO</span><span>Made for movement</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></div></footer>
}
