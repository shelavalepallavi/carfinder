import cars from '@/data/dummy_car_data.json';

import { NextResponse } from 'next/server';


export async function GET(request) {
  const {searchParams} = new URL(request.url);

  const brand = searchParams.get("brand") || searchParams.get("make");
  const fuelTypes = searchParams.get("fuelTypes");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sortBy = searchParams.get("sortBy");

  let filterdCars= [...cars]

  if(brand){
    filterdCars = filterdCars.filter(car => car.make.toLowerCase() === brand.toLowerCase())
  }
  if (fuelTypes) {
    filterdCars = filterdCars.filter(car =>
      fuelTypes.includes(car.fuel)
    );
  }
  if(minPrice){
    filterdCars = filterdCars.filter(car => car.price >= parseInt(minPrice))
  }
  if(maxPrice){
    filterdCars = filterdCars.filter(car => car.price <= parseInt(maxPrice))
  }
  if(search){
    filterdCars = filterdCars.filter(car => car.make.toLowerCase().includes(search.toLowerCase()));
  }
  if (sortBy === "asc") {
    filterdCars.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "desc") {
    filterdCars.sort((a, b) => b.price - a.price);
  }
  
  const startIndex = (page - 1) * limit;
  const paginantedCars = filterdCars.slice(startIndex, startIndex + limit);

  return NextResponse.json({cars: paginantedCars, total: filterdCars.length})
}