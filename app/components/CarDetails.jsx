'use client'
import React from 'react'
import { useCarContext } from '../context/CarContext';

const CarDetails = ({car}) => {
  const {  toggleWishList, isWishListed, theme } = useCarContext();
  return (
    <div className={`w-full min-h-screen px-10 pt-12 flex flex-col md:flex-row gap-12 ${theme === 'dark'? 'bg-gray-800 text-white':''}`}>
      <img src={car.image} alt={car.make} className='w-full md:w-1/2 h-2/3 aspect-video object-cover rounded-md' />

      <div className={`flex flex-col gap-3 ${theme === 'dark'? 'text-white' : 'text-gray-600'}`}>
          <h2 className={`font-semibold text-3xl ${theme === 'dark'? 'text-white': 'text-black'}`}>{car.make} - {car.model}</h2>
          <p className=''><span>⭐⭐⭐⭐</span> | <span>(289 Reviews)</span></p>
          <p className=' text-lg'>Year: {car.year}</p>
          <p className=' text-lg'>Fuel: {car.fuel}</p>
          <p className='text-lg'>Transmission: {car.transmission}</p>
          <div className='text-lg leading-relaxed'>
  <span>
    Discover a perfect fusion of style, comfort, and performance in every drive.
  </span>
  <span>
    Whether you're navigating city streets or chasing the open road, this vehicle adapts to your every journey with ease.
  </span>
  <span>
    Crafted to complement your lifestyle — wherever the road takes you.
  </span>
</div>

          <p className={`${theme === 'dark'? 'text-while' : 'text-gray-900'} text-xl font-bold`}>${car.price.toLocaleString()}</p>
          <div className='flex gap-4'>
            <button className='px-4 py-2 rounded-md font-semibold border cursor-pointer' onClick={(e) => {
              e.stopPropagation(); 
              toggleWishList(car.id)}}><img src={isWishListed(car.id) ? "/heart-red.png" : theme === 'dark' ? "/heart-light.svg": '/heart.svg'} alt="wishlist" className="cursor-pointer w-5" /></button>
            <button className={`px-4 py-2 rounded-md font-semibold text-indigo-800 border border-indigo-800 hover:bg-indigo-700 hover:text-white cursor-pointer transition ${theme === 'dark'? 'bg-indigo-700 text-white':''}`}>Buy Now</button>
          </div>
      </div>
    </div>
  )
}

export default CarDetails
