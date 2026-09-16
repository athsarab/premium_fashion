'use client'

type ProductImageProps = {
  src: string
  fallback: string
  alt: string
  className?: string
  priority?: boolean
}

export function ProductImage({ src, fallback, alt, className = '', priority = false }: ProductImageProps) {
  return <img src={src} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallback }} />
}
