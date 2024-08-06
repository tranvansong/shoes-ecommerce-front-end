import React from "react";
import { Link } from "react-router-dom";

function Banner2() {
  return (
    <div>
      <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse bg-gray-200 lg:max-w-5xl mt-20 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
        <div className="w-full h-64 lg:w-1/2 lg:h-auto">
          <img
            className="h-full w-full object-cover"
            src="https://mir-s3-cdn-cf.behance.net/projects/404/6c1669170450969.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.jpg"
            alt="Nike"
          />
        </div>

        <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
          <div className="flex flex-col p-12 md:px-16">
            <h2 className="text-2xl font-medium uppercase text-green-800 lg:text-4xl">
              Summer Sale 2024
            </h2>
            <p className="mt-4 text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-8">
            <Link to="/products"
              className="px-6 py-4 text-lg text-red-500 font-semibold tracking-wider transition-all duration-300 ease-in-out bg-transparent border-4 border-red-500 md:px-8 hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              <span>SHOP NOW</span>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner2;
