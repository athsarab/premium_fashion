import type { Metadata } from 'next'
import { AccountPage } from '@/components/fashion/account-page'

export const metadata: Metadata = {
  title: 'Your Account',
  description: 'Create and manage your JEILEE’S account.',
}

export default function Account() {
  return <AccountPage />
}