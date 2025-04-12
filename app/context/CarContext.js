'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CarContext = createContext();

export const CarProvider = ({children}) => {
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    fuelTypes: [],
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  })
  const [page, setPage] = useState(1)
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishList = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    )
  }

  const isWishListed = (id) => wishlist.includes(id);
  
  

  const value = {
    filters,
    setFilters,
    page, 
    setPage,
    wishlist,
    toggleWishList,
    isWishListed
  };
  return <CarContext.Provider value={value}>
    {children}
    </CarContext.Provider>
}

export const useCarContext = () => useContext(CarContext)