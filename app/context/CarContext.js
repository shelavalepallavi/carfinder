'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

  const isWishListed = (id) => wishlist.includes(id);

  const toggleWishList = (id) => {
    const isWish = isWishListed(id);
  
    const updated = isWish
      ? wishlist.filter((carId) => carId !== id)
      : [...wishlist, id];
  
    setWishlist(updated);
    if (isWish) {
      toast.success("Removed from Wishlist", {
        style: {
          background: '#ff4d4d',
          color: '#fff',
        },
        icon: '',
      });
    } else {
      toast.success("Added to Wishlist", {
        style: {
          background: '#333',
          color: '#fff',
        },
        icon: '❤️',
      });
    }
  };
  

 
  
  

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