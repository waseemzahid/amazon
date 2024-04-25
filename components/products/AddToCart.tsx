'use client'
import useCartService from '@/lib/hooks/useCartStore'
import { OrderItem } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter()
  const { items, increase, decrease } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])

  const addToCartHandler = () => {
    increase(item)
  }
  return existItem ? (
    <div className="flex items-center">
      <button
        className="px-3 py-1 bg-orange-500 text-white rounded-l-md"
        type="button"
        onClick={() => decrease(existItem)}
      >
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button
        className="px-3 py-1 bg-orange-500 text-white rounded-r-md"
        type="button"
        onClick={() => increase(existItem)}
      >
        +
      </button>
    </div>
  ) : (
    <button
      className="w-full px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
      type="button"
      onClick={addToCartHandler}
    >
      Add to cart
    </button>
  )
}
