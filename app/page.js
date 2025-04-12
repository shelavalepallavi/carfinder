'use client'
import React from 'react'
import Filter from './components/Filter'
import CarList from './components/CarList'
import { useCarContext } from './context/CarContext';

const page = () => {
  const {theme} = useCarContext();
  return (
    <div className={`flex px-4 py-4 gap-4 ${theme === 'dark'? 'bg-[#1E2936]':'bg-gray-100'}`}>
      <Filter/>
      <CarList/>
    </div>
  )
}

export default page
