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
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    localStorage.setItem('theme', theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [wishlist, theme])

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
  

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

 
  
  

  const value = {
    filters,
    setFilters,
    page, 
    setPage,
    wishlist,
    toggleWishList,
    isWishListed,
    theme,
    toggleTheme
  };
  return <CarContext.Provider value={value}>
    {children}
    </CarContext.Provider>
}

export const useCarContext = () => useContext(CarContext)