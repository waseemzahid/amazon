import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Menu from './Menu'
// import Menu from './Menu'
// import { SearchBox } from './SearchBox'

const Header = () => {
  return (
    <header className='bg-black'>
      <nav className='container mx-auto px-16 py-2'>
        <div className="navbar justify-between bg-opacity-80 text-white">
          <div>
            {/* <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label> */}
            <Link href="/" className="text-lg">
              <Image
                src={'/images/logo.png'}
                alt={'logo'}
                width={150}
                height={60}
              />
            </Link>
            {/* <ul className="flex">
              <li>
                <Link href="/cart" className="btn btn-ghost rounded-btn">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/signin" className="btn btn-ghost rounded-btn">
                  Sign In
                </Link>
              </li>
            </ul> */}
          </div>

          <Menu />
        </div>
        <div className="bg-base-300 block md:hidden text-center pb-3">
          {/* <SearchBox /> */}
        </div>
      </nav>
    </header>
  )
}

export default Header
