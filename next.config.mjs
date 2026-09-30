/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== 'production'
const scriptSources = ["'self'", "'unsafe-inline'", 'https://va.vercel-scripts.com']

if (isDevelopment) {
  scriptSources.push("'unsafe-eval'")
}

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: `default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src ${scriptSources.join(' ')}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com data: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-src 'none'; worker-src 'self' blob:; manifest-src 'self'` },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ]
  },
}

export default nextConfig
