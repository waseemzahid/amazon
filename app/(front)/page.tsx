import ProductItem from '@/components/products/ProductItem'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utlis'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Amazon | Home' || process.env.NEXT_PUBLIC_APP_NAME,
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  // const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  const latestBanners = await productService.getBanner()
  return (
    <>
      <div className="w-full carousel">
        {latestBanners.map((banners, index) => (
          <div
            key={banners._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <img src={banners.image} className="w-full" alt={banners.name} />
            <div
              className="absolute flex justify-between transform 
               -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a
                href={`#slide-${
                  index === 0 ? latestBanners.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide-${
                  index === latestBanners.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-16 mb-12">
        <h2 className="text-2xl py-8 text-orange-400 font-bold">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {latestProducts.map((product) => (
            <ProductItem
              key={product.slug}
              product={convertDocToObj(product)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
