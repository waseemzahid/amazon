'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CartDetails() {
  const router = useRouter()
  const { items, itemsPrice, decrease, increase } = useCartService()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <>
      <div className="container mx-auto px-16 mb-10">
        <h1 className="text-2xl py-8 text-orange-400 font-bold">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center">
            Cart is empty.{' '}
            <Link href="/" className="text-orange-500">
              Go shopping
            </Link>
          </div>
        ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="table w-full">
                <thead className="text-center">
                  <tr>
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td className="px-4 py-2">
                        <Link href={`/product/${item.slug}`} className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={70}
                            height={70}
                          ></Image>
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          <button
                            className="px-3 py-1 bg-orange-500 text-white rounded-l-md"
                            type="button"
                            onClick={() => decrease(item)}
                          >
                            -
                          </button>
                          <span className="px-2">{item.qty}</span>
                          <button
                            className="px-3 py-1 bg-orange-500 text-white rounded-r-md"
                            type="button"
                            onClick={() => increase(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:flex md:items-center md:justify-end">
              <div className="card bg-base-300 p-4">
                <div className="text-center">
                  <p className="text-xl font-bold">
                    Total ({items.reduce((a, c) => a + c.qty, 0)}) : ${itemsPrice}
                  </p>
                  <button
                    onClick={() => router.push('/shipping')}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        )}
      </div>
    </>
  )
}