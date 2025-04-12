"use client"
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='shadow-sm h-32 sm:h-24 md:h-16  w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 px-8 '>
      <Link href='/' className='flex gap-2 items-center cursor-pointer'>
        <img  src="car.png" alt="" className='w-10'/>
        <p className='text-2xl font-semibold'>CarFinder</p>
      </Link>
      <div className='flex gap-6 items-center'>
        <img src="moon.svg" alt="" className='cursor-pointer'/>
        <Link href='/wishlist'>
        <img src="wishlist.svg" alt="" className='cursor-pointer'/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar

