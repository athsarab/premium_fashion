import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/seo'

const routes = ['', '/shop', '/new-drop', '/collections', '/sale', '/our-story', '/about', '/contact', '/shop/basics', '/shop/tops', '/shop/bottoms', '/shop/dresses', '/shop/skirts', '/collections/anime-extravaganza-1-0']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteMetadata.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/shop') || route.startsWith('/collections') ? 0.9 : 0.8,
  }))
}
