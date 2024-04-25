'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import Image from 'next/image'

const backgroundStyle = {
  backgroundImage: 'url("/images/payment.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}

const Form = () => {
  const router = useRouter()
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService()

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        clear()
        toast.success('Order placed successfully')
        return router.push(`/order/${data.order._id}`)
      } else {
        toast.error(data.message)
      }
    }
  )
  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment')
    }
    if (items.length === 0) {
      return router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <div style={backgroundStyle}>
      <CheckoutSteps current={4} />
      <div className="grid md:grid-cols-4 md:gap-5 my-4 container mx-auto px-16">
        <div className="overflow-x-auto md:col-span-3">
          <div className="bg-black bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white">
            <div className="card-body">
              <h2 className="card-title text-orange-500 font-bold">
                Shipping Address
              </h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
              </p>
              <div className="mt-3">
                <Link
                  className="px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                  href="/shipping"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white mt-4">
            <div className="card-body">
              <h2 className="card-title text-orange-500 font-bold">
                Payment Method
              </h2>
              <p>{paymentMethod}</p>
              <div className="mt-3">
                <Link
                  className="px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                  href="/payment"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white mt-4">
            <div className="card-body">
              <h2 className="card-title text-orange-500">Items</h2>
              <table className="table">
                <thead className="text-white">
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="px-2">
                            {item.name}({item.color} {item.size})
                          </span>
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3">
                <Link
                  className="px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                  href="/cart"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-black bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white">
            <div className="card-body">
              <h2 className="card-title text-orange-500">Order Summary</h2>
              <ul className="space-y-3">
                <li>
                  <div className=" flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className="w-full px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form
