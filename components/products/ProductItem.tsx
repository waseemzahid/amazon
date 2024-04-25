import { Product } from '@/lib/models/ProductModel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <figure className="relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover h-64 w-full"
          />
        </Link>
        <figcaption className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-4 py-2">
          <span className="text-lg font-semibold">{product.name}</span>
        </figcaption>
      </figure>
      <div className="card-body p-4">
        <p className="text-gray-700 mb-2">{product.brand}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">${product.price}</span>
          {/* <Link href={`/product/${product.slug}`}>
            <button className="text-white bg-orange-400 border-0 py-2 px-4 focus:outline-none hover:bg-orange-500 rounded">
              Add to cart
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  )
}
