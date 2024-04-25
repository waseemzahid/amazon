'use client'
import useCartService from '@/lib/hooks/useCartStore'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Menu = () => {
  const { items } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const signoutHandler = () => {
    signOut({ callbackUrl: '/' })
  }
  const { data: session } = useSession()
  return (
    <>
        <div>
        <ul className="flex items-stretch">
      <li>
      <Link
        className="btn btn-ghost font-bold rounded-btn menu-btn hover:text-orange-500"
        href="/cart"
      >
        Cart{' '}
        {mounted && items.length !== 0 && (
          <div className="badge bg-orange-500 text-white border-none">
            {items.reduce((a, c) => a + c.qty, 0)}{' '}
          </div>
        )}
      </Link>
    </li>
    {session && session.user ? (
      <>
        <li>
          <div className="dropdown dropdown-bottom dropdown-end">
            <button tabIndex={0} className="btn btn-ghost font-bold rounded-btn menu-btn hover:text-orange-500">
              {session.user.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-black bg-opacity-80 text-white rounded-box w-52 "
            >
              <li>
                <button type="button" onClick={signoutHandler} className='rounded-btn menu-btn hover:text-orange-500'>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </li>
      </>
    ) : (
      <li>
        <button
          className="btn btn-ghost font-bold rounded-btn menu-btn hover:text-orange-500"
          type="button"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </li>
    )}
  </ul>
  </div>
    </>
  )
}

export default Menu
