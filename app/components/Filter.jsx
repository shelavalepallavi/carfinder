'use client'
import React, { useState } from 'react'
import { useCarContext } from '../context/CarContext'

const Filter = () => {
  const {filters, setFilters, setPage, theme, toggleTheme} = useCarContext();
  const [tempFilters, setTempFilters] = useState(filters);
  

  return (
    <div className={`w-64 shadow-sm min-h-[100vh] p-4 rounded-md ${theme === 'dark'? 'bg-[#171717] text-white':''}`}>
      <h2 className='text-lg font-semibold text-center mb-4'>Filter Cars</h2>

      <div className='flex flex-col gap-3'>
      <input type="text" placeholder='Search by name or model' className='w-full outline-0 border-[0.5px] border-gray-400 rounded-md p-2' value={tempFilters.search || ""} onChange={(e) => setTempFilters(prev => ({...prev, search:e.target.value}))}/>

      <div className='flex flex-col gap-2'>
        <label className='font-semibold'>Brand</label>
        <select className='w-full outline-0 border-[0.5px] border-gray-400 rounded-md p-2 cursor-pointer' value={tempFilters.brand} onChange={(e) => setTempFilters(prev => ({...prev, brand:e.target.value}))}>
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="Tesla">Tesla</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="Mahindra">Mahindra</option>
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='font-semibold'>Fuel Type</label>
        <div className='space-y-2'>
          {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(fuel =>(
            <label key={fuel} className='flex items-center gap-2'>
              <input type="checkbox" className='cursor-pointer' value={fuel} checked={tempFilters.fuelTypes?.includes(fuel) || false} onChange={(e) => {
                 const checked = e.target.checked;
                    setTempFilters(prev => ({
                     ...prev,
                   fuelTypes: checked
                 ? [...(prev.fuelTypes || []), fuel]
                : (prev.fuelTypes || []).filter(f => f !== fuel)
              }));
             }} />
              {fuel}
            </label>
          ))}
        </div>
      </div>


      <div className='flex flex-col gap-2'>
      <label className='font-semibold'>Price Range</label>
      <div className='flex items-center gap-2'>
        <input type="number" placeholder='Min' className='w-1/2 border-[0.5px] border-gray-400 outline-0 p-2 rounded-md' value={tempFilters.minPrice || ""} onChange={(e) => setTempFilters(prev => ({...prev, minPrice:e.target.value}))}/>
        <input type="number" placeholder='Max' className='w-1/2 border-[0.5px] border-gray-400 outline-0 p-2 rounded-md' value={tempFilters.maxPrice || ""} onChange={(e) => setTempFilters(prev => ({...prev, maxPrice:e.target.value}))}/>
      </div>
      </div>

      <div className="flex flex-col gap-2">
      <label className='font-semibold'>Sort by</label>
      <select className='w-full outline-0 border-[0.5px] border-gray-400 rounded-md p-2 cursor-pointer' value={tempFilters.sortBy || ""} onChange={e => setTempFilters(prev => ({...prev, sortBy:e.target.value}))}>
          <option value="">None</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className='flex justify-between gap-4 mt-3'>
        <button className='px-4 py-2 font-semibold rounded-md text-gray-500 border-[0.5px] border-r-gray-400 cursor-pointer hover:border-transparent hover:bg-red-500 hover:text-white transition-all'
        onClick={() => {
          const reset = {
            search: "",
            brand: "",
            fuelTypes: [],
            minPrice: "",
            maxPrice: "",
            sortBy: "",
          };
          setFilters(reset);
          setTempFilters(reset);
          setPage(1);
        }}
        
        
        >Reset Filters</button>
        <button className='px-4 py-2 font-semibold rounded-md cursor-pointer bg-indigo-700 text-white  hover:bg-indigo-800' onClick={() => {
          setFilters(tempFilters);
          setPage(1)
        }}>Apply</button>
      </div>
      </div>

    </div>
  )
}

export default Filter
