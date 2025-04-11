'use client';

import { createContext, useContext, useState } from 'react';

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

  const value = {
    filters,
    setFilters,
    page, 
    setPage
  };
  return <CarContext.Provider value={value}>{children}</CarContext.Provider>
}

export const useCarContext = () => useContext(CarContext)