'use client'
import React from 'react'
import { useCarContext } from '../context/CarContext'
import cars from '../../data/dummy_car_data.json';
import Link from 'next/link';

const page = () => {
  const {wishlist, toggleWishList} = useCarContext();

  const wishlistedCars = cars.filter(car => wishlist.includes(car.id));

  if(wishlistedCars.length === 0){
    return <p className="p-10 text-center text-lg">Your wishlist is empty 😢</p>;
  }

  return (
    <div className='px-48 py-8'>
      <h2 className='text-2xl font-semibold mb-8 text-center'>Wishlisted Items</h2>
      <div>
        <div className='grid grid-cols-4 gap-4 pb-6'>
          <p className='text-xl font-semibold'>Product</p>
          <p className='text-xl font-semibold'>Name</p>
          <p className='text-xl font-semibold'>Price</p>
          <p className='text-xl font-semibold'>Remove</p>
        </div>
        {wishlistedCars.map(car => (
          <div key={car.id} className='grid grid-cols-4 items-center py-6 border-y border-gray-300'>
            <Link href={`/cars/${car.id}`}>
            <img src={car.image} alt="" className='w-32 rounded-md aspect-video object-cover'/>
            </Link>
            <h2 className='font-semibold text-gray-600 '>{car.make} - {car.model}</h2>
            <p className='font-semibold'>${car.price.toLocaleString()}</p>
            <div className='relative group'>
            <img src="/cancel.svg" alt="remove" className='cursor-pointer w-5' onClick={() => toggleWishList(car.id)}/>
            <div className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-indigo-800 text-white font-semibold px-2 py-1 rounded shadow">Remove</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
