'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { ShippingAddress } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form'

const backgroundStyle = {
  backgroundImage: 'url("/images/Cart.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}

const Form = () => {
  const router = useRouter()
  const { saveShippingAddrress, shippingAddress } = useCartService()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  })

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddrress(form)
    router.push('/payment')
  }

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress
    name: string
    required?: boolean
    pattern?: ValidationRule<RegExp>
  }) => (
    <div className="mb-1">
      <label className="label" htmlFor={id}>
        {name}
      </label>
      <input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className="input input-bordered w-full max-w-xl text-black"
      />
      {errors[id]?.message && (
        <div className="text-error">{errors[id]?.message}</div>
      )}
    </div>
  )

  return (
    <div style={backgroundStyle}>
      <CheckoutSteps current={1} />
      <div className="mx-auto bg-black bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white max-w-xl">
        <div className="card-body">
          <h1 className="card-title text-orange-500">Shipping Address</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-wrap md:w-2/2">
              <div className="w-full xl:w-2/2">
                <FormInput name="Full Name" id="fullName" required />
              </div>
              <div className="w-full md:w-1/2 pr-3">
                <FormInput name="Address" id="address" required />
              </div>
              <div className="w-full md:w-1/2">
                <FormInput name="City" id="city" required />
              </div>
              <div className="w-full md:w-1/2 pr-3">
                <FormInput name="Postal Code" id="postalCode" required />
              </div>
              <div className="w-full md:w-1/2">
                <FormInput name="Country" id="country" required />
              </div>
            </div>
            <div className="my-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Form
