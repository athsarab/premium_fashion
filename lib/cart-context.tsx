'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { ShopProduct } from '@/lib/fashion-data'

export type CartItem = ShopProduct & { quantity: number }

type CartState = { items: CartItem[]; drawerOpen: boolean; toast: string | null; hydrated: boolean }

type CartAction =
  | { type: 'ADD_ITEM'; product: ShopProduct }
  | { type: 'REMOVE_ITEM'; name: string }
  | { type: 'UPDATE_QTY'; name: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'SET_TOAST'; message: string | null }
  | { type: 'HYDRATE'; items: CartItem[] }

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.name === action.product.name)
      if (existing) {
        return { ...state, items: state.items.map((i) => i.name === action.product.name ? { ...i, quantity: i.quantity + 1 } : i), toast: `${action.product.name} updated` }
      }
      return { ...state, items: [...state.items, { ...action.product, quantity: 1 }], toast: `${action.product.name} added to bag` }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.name !== action.name) }
    case 'UPDATE_QTY': {
      if (action.quantity < 1) return { ...state, items: state.items.filter((i) => i.name !== action.name) }
      return { ...state, items: state.items.map((i) => i.name === action.name ? { ...i, quantity: action.quantity } : i) }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false }
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen }
    case 'SET_TOAST':
      return { ...state, toast: action.message }
    case 'HYDRATE': {
      if (state.hydrated) return state
      const items = action.items.map((storedItem) => {
        const currentItem = state.items.find((item) => item.name === storedItem.name)
        return currentItem ? { ...storedItem, quantity: storedItem.quantity + currentItem.quantity } : storedItem
      })
      const hydratedNames = new Set(action.items.map((item) => item.name))
      return { ...state, items: [...items, ...state.items.filter((item) => !hydratedNames.has(item.name))], hydrated: true }
    }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  drawerOpen: boolean
  toast: string | null
  addItem: (product: ShopProduct) => void
  removeItem: (name: string) => void
  updateQty: (name: string, qty: number) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  dismissToast: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'Jeilees-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], drawerOpen: false, toast: null, hydrated: false })

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const parsed = stored ? JSON.parse(stored) : []
      dispatch({ type: 'HYDRATE', items: Array.isArray(parsed) ? parsed : [] })
    } catch {
      dispatch({ type: 'HYDRATE', items: [] })
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (!state.hydrated) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)) } catch { /* ignore */ }
  }, [state.items, state.hydrated])

  // Auto-dismiss toast
  useEffect(() => {
    if (!state.toast) return
    const timer = setTimeout(() => dispatch({ type: 'SET_TOAST', message: null }), 2500)
    return () => clearTimeout(timer)
  }, [state.toast])

  const addItem = useCallback((product: ShopProduct) => {
    dispatch({ type: 'ADD_ITEM', product })
    dispatch({ type: 'OPEN_DRAWER' })
  }, [])
  const removeItem = useCallback((name: string) => dispatch({ type: 'REMOVE_ITEM', name }), [])
  const updateQty = useCallback((name: string, qty: number) => dispatch({ type: 'UPDATE_QTY', name, quantity: qty }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), [])
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [])
  const toggleDrawer = useCallback(() => dispatch({ type: 'TOGGLE_DRAWER' }), [])
  const dismissToast = useCallback(() => dispatch({ type: 'SET_TOAST', message: null }), [])

  const count = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items])
  const total = useMemo(() => state.items.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0), [state.items])

  const value = useMemo<CartContextValue>(() => ({
    items: state.items, count, total, drawerOpen: state.drawerOpen, toast: state.toast,
    addItem, removeItem, updateQty, clearCart, openDrawer, closeDrawer, toggleDrawer, dismissToast,
  }), [state.items, count, total, state.drawerOpen, state.toast, addItem, removeItem, updateQty, clearCart, openDrawer, closeDrawer, toggleDrawer, dismissToast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
