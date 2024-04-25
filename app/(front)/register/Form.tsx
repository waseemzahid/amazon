'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
const backgroundStyle = {
  backgroundImage: 'url("/images/bg-login.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const Form = () => {
  const { data: session } = useSession()

  const params = useSearchParams()
  const router = useRouter()
  let callbackUrl = params.get('callbackUrl') || '/'
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account Created, Please Sign In`
        )
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
        const error =
          err.message && err.message.indexOf('E11000') === 0
            ? 'Email Already Exist' : err.message
      //toast.error(err.message || 'error')
      toast.error(error || 'error')
    }
  }
  return (
    <div style={backgroundStyle}>
      <div className="max-w-xl mx-auto bg-black bg-opacity-60 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white">
        <div className="card-body text-center">
          <h1 className="card-title">Register</h1>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-2">
            <div className="flex flex-wrap justify-between">
              <div className="w-full sm:w-6/12 pr-3">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  className="input input-bordered w-full text-black"
                />
                {errors.name?.message && (
                  <div className="text-error">{errors.name.message}</div>
                )}
              </div>
              <div className="w-full sm:w-6/12 pr-3">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Email is invalid',
                    },
                  })}
                  className="input input-bordered w-full text-black"
                />
                {errors.email?.message && (
                  <div className="text-error">{errors.email.message}</div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full sm:w-6/12 pr-3">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="input input-bordered w-full text-black"
                />
                {errors.password?.message && (
                  <div className="text-error">{errors.password.message}</div>
                )}
              </div>
              <div className="w-full sm:w-6/12 pr-3">
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) => {
                      const { password } = getValues()
                      return password === value || 'Passwords should match!'
                    },
                  })}
                  className="input input-bordered w-full text-black"
                />
                {errors.confirmPassword?.message && (
                  <div className="text-error">
                    {errors.confirmPassword.message}
                  </div>
                )}
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
                Register
              </button>
            </div>
          </form>
          <div>
            Already have an account?{' '}
            <Link
              className="link text-orange-500 font-semibold"
              href={`/signin?callbackUrl=${callbackUrl}`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
