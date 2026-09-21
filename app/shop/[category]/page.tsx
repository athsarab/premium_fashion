import { ShopCategoryPage } from '@/components/fashion'
import { shopCategories, type ShopCategory } from '@/lib/fashion-data'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.key }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = shopCategories.find((c) => c.key === category)
  return pageMetadata({
    title: `Shop ${cat?.label || category}`,
    description: cat?.description || `Browse our ${category} collection at JEILEE’S.`,
    path: `/shop/${category}`,
  })
}

export default async function CategoryRoute({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return <ShopCategoryPage category={category as ShopCategory} />
}

