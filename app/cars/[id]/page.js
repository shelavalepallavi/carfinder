import React from 'react'
import cars from '../../../data/dummy_car_data.json';
import CarDetails from '@/app/components/CarDetails';


export async function generateStaticParams() {
  return cars.map(car => ({
    id: car.id.toString(),
  }));
}

const Page = async ({params}) => {
  const {id} = params
  const car = cars.find(c => c.id.toString() === id);
  console.log('params:', params);

  


  if(!car) return <p>Car not found</p>;

  return <CarDetails car={car}/>
}

export default Page


