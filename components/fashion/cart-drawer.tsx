'use client'

import { useEffect, useRef } from 'react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart, type CartItem } from '@/lib/cart-context'

const WHATSAPP_NUMBER = '94771234567'

function formatCurrency(amount: number): string {
  return `LKR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines = [
    '🛍️ *VERRA — New Order*',
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

export function CartDrawer() {
  const { items, count, total, drawerOpen, closeDrawer, clearCart } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

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
              </button>

              <button className="cart-clear" onClick={clearCart}>Clear bag</button>
            </div>
          </>
        )}
      </aside>
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
