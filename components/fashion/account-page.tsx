'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, LogOut } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Footer, PageShell } from './site-shell'

export function AccountPage() {
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null)
  const getSupabase = () => {
    supabaseRef.current ??= createClient()
    return supabaseRef.current
  }
  const [user, setUser] = useState<User | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let mounted = true
    getSupabase().auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user)
    })
    const { data: listener } = getSupabase().auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null)
    })
    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const initialName = user.user_metadata?.full_name ?? ''
    setFullName(initialName)
    getSupabase().from('profiles').select('full_name, phone').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (data) {
        setFullName(data.full_name ?? '')
        setPhone(data.phone ?? '')
      }
    })
  }, [user])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    const supabase = getSupabase()
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } })
    setBusy(false)
    if (result.error) return setMessage(result.error.message)
    if (mode === 'signup' && !result.data.session) setMessage('Check your email to confirm your account, then log in.')
    else setMessage('Welcome back.')
  }

  async function signInWithGoogle() {
    setBusy(true)
    const { error } = await getSupabase().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/account` } })
    if (error) {
      setBusy(false)
      setMessage(error.message)
    }
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    const supabase = getSupabase()
    const { error } = await supabase.from('profiles').upsert({ id: user?.id, full_name: fullName, phone })
    if (!error) await supabase.auth.updateUser({ data: { full_name: fullName, phone } })
    setBusy(false)
    setMessage(error?.message ?? 'Your details are saved.')
  }

  async function signOut() {
    await getSupabase().auth.signOut()
    setMessage('You are signed out.')
  }

  return (
    <PageShell>
      <main className="account-page section-pad">
        <div className="account-heading">
          <p className="eyebrow">JEILEE’S / ACCOUNT</p>
          <h1>{user ? <>WELCOME<br /><i>BACK.</i></> : mode === 'login' ? <>SIGN<br /><i>IN.</i></> : <>JOIN<br /><i>US.</i></>}</h1>
        </div>
        {user ? (
          <div className="account-panel">
            <div className="account-panel-head"><div><p className="eyebrow">YOUR DETAILS</p><p className="account-email">{user.email}</p></div><button className="account-signout" onClick={signOut}><LogOut size={15} /> Sign out</button></div>
            <form className="account-form" onSubmit={saveProfile}>
              <label>Full name<input value={fullName} onChange={(event) => setFullName(event.target.value)} required /></label>
              <label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" /></label>
              <button className="editorial-button" type="submit" disabled={busy}>Save details <Check size={15} /></button>
            </form>
            {message && <p className="account-message"><Check size={15} /> {message}</p>}
          </div>
        ) : (
          <div className="account-panel">
            <form className="account-form" onSubmit={submit}>
              {mode === 'signup' && <label>Full name<input value={fullName} onChange={(event) => setFullName(event.target.value)} required /></label>}
              <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label>Password<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
              {mode === 'signup' && <label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" /></label>}
              <button className="editorial-button" type="submit" disabled={busy}>{busy ? 'Please wait' : mode === 'login' ? 'Sign in' : 'Create account'} <ArrowUpRight size={15} /></button>
            </form>
            <div className="account-divider"><span>OR</span></div>
            <button className="account-google" type="button" onClick={signInWithGoogle} disabled={busy}>Continue with Google</button>
            <button className="account-switch" type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }}>{mode === 'login' ? 'Create an account' : 'Already have an account? Sign in'}</button>
            {message && <p className="account-message">{message}</p>}
          </div>
        )}
      </main>
      <Footer />
    </PageShell>
  )
}