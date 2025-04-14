"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCarContext } from "../context/CarContext";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const { filters, page, setPage, toggleWishList, isWishListed, theme } = useCarContext();

  const router = useRouter();

  const buildQuery = () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
  
    if (filters.search) params.append("search", filters.search);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.fuelTypes?.length) {
      filters.fuelTypes.forEach(fuel => params.append("fuelTypes", fuel));
    }
    if(filters.seating) params.append('seating', filters.seating.toString())
  
    return params.toString();
  };
  

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cars?${buildQuery()}`);
      const data = await res.json();
      setCars(data.cars);
      setTotal(data.total)
    } catch (error) {
      setError("Failed to load cars.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars(page);
  }, [page, filters]);

  const totalPages = Math.ceil(total/limit)

  const handlePrevious = () =>{
    if(page > 1) setPage(page - 1)
  }
  const handleNext = () =>{
    if(page < totalPages) setPage(page + 1)
  }

  


  if (loading) return <p className={`px-6 pt-6 ${theme === 'dark'? 'text-white':''}`}>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="px-6 pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`w-full border border-gray-200 rounded-lg shadow-sm cursor-pointer  hover:shadow-lg transition ${theme === 'dark'? 'bg-gray-900 text-white border-0':'bg-white'}`}
            onClick={() => router.push(`/cars/${car.id}`)}
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="flex flex-col gap-1 p-4">
              <h2 className="font-semibold text-xl">
                {car.make} - {car.model}
              </h2>
              <p className={`${theme === 'dark'?'text-gray-300':'text-gray-600'}`}>Year: {car.year}</p>
              <div className="flex justify-between items-center">
              <p className={`font-semibold ${theme === 'dark'? 'text-white': 'text-gray-900'}`}>
                ${car.price.toLocaleString()}
              </p>
              <div className="relative group">
              <img src={isWishListed(car.id) ? "heart-red.png" : theme === 'dark' ? "heart-light.svg":'heart.svg'} alt="wishlist" className="cursor-pointer w-5" onClick={(e) => {
                e.stopPropagation(); 
                toggleWishList(car.id)}}/>
                <div className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-indigo-800 text-white font-semibold px-2 py-2 rounded shadow">Add to wishlist</div>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button className={`font-semibold border  rounded-md px-4 py-2 cursor-pointer  transition-all ${theme === 'dark'? 'text-white bg-indigo-800 border-transparent hover:bg-indigo-900':'border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:text-white'}`} onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span className={`font-semibold ${theme === 'dark'? 'text-white':''}`}>Page {page} of {totalPages}</span>
        <button className={`font-semibold border  rounded-md px-4 py-2 cursor-pointer  transition-all ${theme === 'dark'? 'text-white bg-indigo-800 border-transparent hover:bg-indigo-900':'border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:text-white'}`} onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default CarList;
