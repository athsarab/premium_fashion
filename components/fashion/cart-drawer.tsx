'use client'

import { useEffect, useRef } from 'react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowUpRight, Check, LogIn, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart, type CartItem } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase/client'

const WHATSAPP_NUMBER = '94772284278'

function formatCurrency(amount: number): string {
  return `LKR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function buildWhatsAppMessage(items: CartItem[], total: number): string {
function buildWhatsAppMessage(items: CartItem[], total: number, customerName: string, customerEmail: string, customerPhone: string): string {
  const lines = [
    '🛍️ *JEILEE’S — New Order*',
    '\u{1F6CD}\uFE0F *JEILEE\'S \u2014 New Order*',
    '',
    `👤 *Customer:* ${customerName}`,
    `📧 *Email:* ${customerEmail}`,
    ...(customerPhone ? [`📞 *Phone:* ${customerPhone}`] : []),
    '',
    '──────────────',
    '',
    ...items.map((item, i) => [
      `*${i + 1}. ${item.name}*`,
      `   Variant: ${item.variant}`,
      `   Qty: ${item.quantity}`,
      `   Price: ${item.price}`,
      '',
    ]).flat(),
    `──────────────`,
    `*Total: ${formatCurrency(total)}*`,
    '',
    'Please confirm availability and delivery details. Thank you!',
  ]
  return lines.join('\n')
}

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart()
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-top">
          <div>
            <h4 className="cart-item-name">{item.name}</h4>
            <p className="cart-item-variant">{item.variant}</p>
          </div>
          <button className="cart-item-remove" onClick={() => removeItem(item.name)} aria-label={`Remove ${item.name}`}>
            <Trash2 size={14} />
          </button>
        </div>
        <div className="cart-item-bottom">
          <div className="cart-qty">
            <button onClick={() => updateQty(item.name, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item.name, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
          </div>
          <span className="cart-item-price">{item.price}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Login Prompt Modal ────────────────────────────────── */
function LoginPromptModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null)
  const getSupabase = () => {
    supabaseRef.current ??= createClient()
    return supabaseRef.current
  }

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [busy, setBusy] = useState(false)

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setMessage(null)
    const supabase = getSupabase()
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } })
    setBusy(false)
    if (result.error) {
      const msg = result.error.message.toLowerCase()
      let text = result.error.message
      if (msg.includes('invalid login credentials')) text = 'That email and password do not match. Check your details or create a new account.'
      else if (msg.includes('user already registered')) text = 'An account with this email already exists. Try signing in instead.'
      else if (msg.includes('password')) text = 'Your password must be at least 8 characters long.'
      return setMessage({ type: 'error', text })
    }
    if (mode === 'signup' && !result.data.session) {
      setMessage({ type: 'success', text: 'Account created! Check your email to confirm, then sign in.' })
    } else {
      setMessage({ type: 'success', text: mode === 'login' ? 'Welcome back! You can now place your order.' : 'Your account is ready. You can now place your order.' })
      // Auto-close after successful login so user can proceed with order
      setTimeout(() => onClose(), 1500)
    }
  }

  async function signInWithGoogle() {
    setBusy(true)
    const { error } = await getSupabase().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/account` } })
    if (error) {
      setBusy(false)
      setMessage({ type: 'error', text: error.message })
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="login-modal-backdrop" onClick={onClose} aria-hidden />

      {/* Modal */}
      <div className="login-modal" role="dialog" aria-modal="true" aria-label="Sign in to place order">
        <div className="login-modal-inner">
          <button className="login-modal-close" onClick={onClose} aria-label="Close login modal">
            <X size={20} />
          </button>

          <div className="login-modal-header">
            <LogIn size={24} />
            <h3>Sign in to place your order</h3>
            <p>Create an account or sign in to complete your purchase. Your bag items are saved.</p>
          </div>

          <form className="login-modal-form" onSubmit={submit}>
            {mode === 'signup' && (
              <label>
                Full name
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Your full name" />
              </label>
            )}
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min. 8 characters" />
            </label>
            {mode === 'signup' && (
              <label>
                Phone
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />
              </label>
            )}
            <button className="editorial-button" type="submit" disabled={busy}>
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'} <ArrowUpRight size={15} />
            </button>
          </form>

          <div className="account-divider"><span>OR</span></div>

          <button className="account-google" type="button" onClick={signInWithGoogle} disabled={busy}>
            Continue with Google
          </button>

          <button
            className="account-switch"
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(null) }}
          >
            {mode === 'login' ? 'Create an account' : 'Already have an account? Sign in'}
          </button>

          {message && (
            <div className={`account-feedback account-feedback-${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}>
              {message.type === 'success' ? <Check size={17} /> : <AlertCircle size={17} />}
              <span>{message.text}</span>
              <button type="button" onClick={() => setMessage(null)} aria-label="Dismiss"><X size={15} /></button>
            </div>
          )}

          <p className="login-modal-alt">
            Or go to your <Link href="/account" onClick={onClose}>account page</Link> for full options.
          </p>
        </div>
      </div>
    </>
  )
}

/* ── Cart Drawer ───────────────────────────────────────── */
export function CartDrawer() {
  const { items, count, total, drawerOpen, closeDrawer, clearCart } = useCart()
  const { user, loading: authLoading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [profileData, setProfileData] = useState<{ fullName: string; phone: string } | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Fetch profile data when user is available
  useEffect(() => {
    if (!user) {
      setProfileData(null)
      return
    }
    const supabase = createClient()
    supabase.from('profiles').select('full_name, phone').eq('id', user.id).maybeSingle().then(({ data }) => {
      setProfileData({
        fullName: data?.full_name || user.user_metadata?.full_name || '',
        phone: data?.phone || user.user_metadata?.phone || '',
      })
    })
  }, [user])

  // Lock body scroll when open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  const handlePlaceOrder = () => {
    if (items.length === 0) return
    const message = buildWhatsAppMessage(items, total)

    // ── Auth gate: require login before placing order ──
    if (!user) {
      setShowLoginModal(true)
      return
    }

    const customerName = profileData?.fullName || user.user_metadata?.full_name || user.email || 'Customer'
    const customerEmail = user.email || ''
    const customerPhone = profileData?.phone || user.user_metadata?.phone || ''

    const message = buildWhatsAppMessage(items, total, customerName, customerEmail, customerPhone)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${drawerOpen ? 'cart-backdrop-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`cart-drawer ${drawerOpen ? 'cart-drawer-open' : ''}`}
        aria-label="Shopping bag"
        role="dialog"
        aria-modal={drawerOpen}
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={18} />
            <h3>Your Bag</h3>
            {count > 0 && <span className="cart-header-count">{count}</span>}
          </div>
          <button className="cart-close" onClick={closeDrawer} aria-label="Close bag">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>Your bag is empty</p>
            <span>Browse our collections to find pieces that speak to you.</span>
            <button className="cart-continue" onClick={closeDrawer}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <CartItemRow key={item.name} item={item} />
              ))}
            </div>

            {/* Footer */}
            <div className="cart-footer">
              {/* Auth status indicator */}
              {!authLoading && (
                <div className={`cart-auth-status ${user ? 'cart-auth-signed-in' : 'cart-auth-signed-out'}`}>
                  {user ? (
                    <>
                      <Check size={14} />
                      <span>Signed in as <strong>{profileData?.fullName || user.email}</strong></span>
                    </>
                  ) : (
                    <>
                      <LogIn size={14} />
                      <span>Sign in required to place order</span>
                    </>
                  )}
                </div>
              )}

              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button className="cart-whatsapp-btn" onClick={handlePlaceOrder}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Place order via WhatsApp
                {user ? 'Place order via WhatsApp' : 'Sign in & place order'}
              </button>

              <button className="cart-clear" onClick={clearCart}>Clear bag</button>
            </div>
          </>
        )}
      </aside>

      {/* Login Modal (shown when unauthenticated user tries to order) */}
      <LoginPromptModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}

export function CartToast() {
  const { toast } = useCart()
  return (
    <div className={`cart-toast ${toast ? 'cart-toast-show' : ''}`}>
      <ShoppingBag size={14} />
      <span>{toast}</span>
    </div>
  )
}
