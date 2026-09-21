import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jeilees.studio'

export function pageMetadata({ title, description, path, image }: { title: string, description: string, path: string, image?: string }): Metadata {
  const canonical = new URL(path, siteUrl).toString()
  const socialImage = image ?? '/apple-icon.png'
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'JEILEE’S',
      title,
      description,
      images: [{ url: socialImage, alt: `${title} | JEILEE’S` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage] },
  }
}

export const siteMetadata = { siteUrl }
