import AddToCart from '@/components/products/AddToCart'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utlis'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <>
      <div className="container mx-auto px-16 py-5 mb-8">
        <div className="my-4">
          <Link
            href="/"
            className="text-orange-500 hover:text-orange-400 font-bold"
          >
            &larr; Back to Products
          </Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.image}
              width={500}
              height={500}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div>
            <ul className="space-y-4 mx-3">
              <li>
                <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
              </li>
              <li>
                {product.rating} of {product.numReviews} Reviews
                {/* {product.rating} {product.rating > 1 ? 'Stars' : 'Star'} */}
              </li>
              <li>
                <p className="text-xl text-orange-500 font-semibold">
                  {product.brand}
                </p>
              </li>
              <li>
                <div className="divider"></div>
              </li>
              <li>
                Description: <p>{product.description}</p>
              </li>
            </ul>
            <div className="card bg-base-300 rounded-lg shadow-lg mt-2 md:mt-1">
              <div className="card-body">
                <div className="mb-0.5 flex justify-between">
                  <div>Price</div>
                  <div className="text-orange-500 font-semibold">
                    ${product.price}
                  </div>
                </div>
                <div className="mb-0.5 flex justify-between">
                  <div>Status</div>
                  <div className="text-orange-500 font-semibold">
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                {/* <div className="card-actions justify-center">
                  <button className="text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-400 rounded w-full">
                    Add to cart
                  </button>
                </div> */}
                {product.countInStock !== 0 && (
                  <div className="card-actions justify-center">
                    <AddToCart
                      item={{
                        ...convertDocToObj(product),
                        qty: 0,
                        color: '',
                        size: '',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
