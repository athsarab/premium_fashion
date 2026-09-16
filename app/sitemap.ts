import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/seo'

const routes = ['', '/men', '/women', '/kids', '/about', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteMetadata.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
