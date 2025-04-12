"use client";
import Link from "next/link";
import React from "react";
import { useCarContext } from "../context/CarContext";

const Navbar = () => {
  const {theme, toggleTheme} = useCarContext();

  return (
    <div className={`shadow-sm h-32 sm:h-24 md:h-16  w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 px-8 ${theme === 'dark' ? 'bg-gray-900 text-white': ''}`}>
      <Link href="/" className="flex gap-2 items-center cursor-pointer">
        <img src="logo.png" alt="" className="w-10" />
        <p className="text-2xl font-semibold">CarFinder</p>
      </Link>
      <div className="flex gap-6 items-center">
        <img src={theme === 'light' ? "moon.svg" : "sun.svg"} alt="" className="cursor-pointer" onClick={toggleTheme}/>
        <div className="relative group">
          <Link href="/wishlist">
            <img src={theme === 'light' ? "wishlist.svg" : "wishlist-light.svg"} alt="" className="cursor-pointer" />
          </Link>
          <div className="absolute top-full right-0 mt-1 hidden group-hover:block text-xs font-semibold bg-indigo-800 text-white px-2 py-2 rounded shadow whitespace-nowrap z-50">
            Wishlisted cars
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
