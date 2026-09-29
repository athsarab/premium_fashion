import { notFound } from 'next/navigation'
import { ProductDetailPage } from '@/components/fashion'
import { getProduct, productSlug, shopProducts } from '@/lib/fashion-data'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return shopProducts.map((product) => ({ slug: productSlug(product.name) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  return pageMetadata({
    title: product?.name ?? 'Product',
    description: product?.variant ? `${product.name} in ${product.variant}. Shop JEILEE'S.` : 'Shop JEILEE\'S.',
    path: `/shop/product/${slug}`,
    image: product?.image,
  })
}

export default async function ProductRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getProduct(slug)) notFound()
  return <ProductDetailPage slug={slug} />
}