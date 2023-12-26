'use client'

import { getSession, signOut } from 'next-auth/react'
import { NextPageContext } from 'next'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <h1 className='text-green-500 text-xl'>Netflix clone</h1>
      <button className='h-10 w-full bg-white' onClick={() => signOut()}>
        Logout
      </button>
    </>
  )
}

// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px;
// 2xl: 1536px
