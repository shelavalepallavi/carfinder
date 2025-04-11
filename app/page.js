
import React from 'react'
import Filter from './components/Filter'
import CarList from './components/CarList'

const page = () => {
 
  return (
    <div className='flex px-4 py-4 gap-2'>
      <Filter/>
      <CarList/>
    </div>
  )
}

export default page
