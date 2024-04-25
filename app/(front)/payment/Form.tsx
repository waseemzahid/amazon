'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const backgroundStyle = {
  backgroundImage: 'url("/images/payment-2.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}

const Form = () => {
  const router = useRouter()
  const { savePaymentMethod, paymentMethod, shippingAddress } = useCartService()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    savePaymentMethod(selectedPaymentMethod)
    router.push('/place-order')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || 'PayPal')
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <div style={backgroundStyle}>
      <CheckoutSteps current={2} />
      <div className="max-w-sm mx-auto bg-black bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white">
        <div className="card-body">
          <h1 className="card-title text-orange-500">Payment Method</h1>
          <form onSubmit={handleSubmit}>
            {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
              <div key={payment}>
                <label className="label cursor-pointer">
                  <span className="label-text text-white">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio bg-white checked:bg-orange-500"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className="my-2">
              <button
                type="submit"
                className="w-full mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300">
                Next
              </button>
            </div>
            <div className="my-2">
              <button
                type="button"
                className="w-full px-6 py-2 bg-base-300 text-black rounded-md shadow-md hover:bg-gray-100 transition duration-300"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Form
