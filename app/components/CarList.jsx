"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCarContext } from "../context/CarContext";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [liked, setLiked] = useState(false)
  const limit = 10;

  const { filters, page, setPage } = useCarContext();

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


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="w-80 border border-gray-200 rounded-lg shadow-sm cursor-pointer  hover:shadow-lg transition"
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
              <p className="text-gray-600">Year: {car.year}</p>
              <div className="flex justify-between items-center">
              <p className="text-gray-900 font-semibold">
                ${car.price.toLocaleString()}
              </p>
              <img src={liked ? "heart-red.png" : "heart.svg"} alt="" className="cursor-pointer w-5" onClick={(e) => {
                e.stopPropagation(); 
                setLiked(!liked);}}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button className="font-semibold border border-gray-700 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-all" onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="font-semibold border border-gray-700 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-all" onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default CarList;
