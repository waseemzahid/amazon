'use client'
import { signIn, useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

type Inputs = {
  email: string
  password: string
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
  let callbackUrl = params.get('callbackUrl') || '/'
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form
    signIn('credentials', {
      email,
      password,
    })
  }
  return (
    <div style={backgroundStyle}>
      <div className="max-w-sm mx-auto bg-black bg-opacity-60 backdrop-blur-lg backdrop-filter rounded-lg overflow-hidden shadow-lg my-4 text-white">
        <div className="card-body text-center">
          <h1 className="card-title">Sign in</h1>
          {params.get('error') && (
            <div className="alert text-error">
              {params.get('error') === 'CredentialsSignin'
                ? 'Invalid email or password'
                : params.get('error')}
            </div>
          )}
          {params.get('success') && (
            <div className="alert text-success">{params.get('success')}</div>
          )}
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="my-1">
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
                className="input input-bordered w-full max-w-md text-black"
              />
              {errors.email?.message && (
                <div className="text-error">{errors.email.message}</div>
              )}
            </div>
            <div className="my-1">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                className="input input-bordered w-full max-w-md text-black"
              />
              {errors.password?.message && (
                <div className="text-error">{errors.password.message}</div>
              )}
            </div>
            <div className="my-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Sign in
              </button>
            </div>
          </form>
          <div>
            Need an account?{' '}
            <Link
              className="link text-orange-500 font-semibold"
              href={`/register?callbackUrl=${callbackUrl}`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form
