import React from "react";

function Banner() {
  return (
    <div>
      <div
        className="items-center bg-gradient-to-r from-blue-300 to-blue-500 grid-cols-2 px-20 overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <div className="pr-2 md:mb-14 py-14 md:py-0">
          <h1 className="text-4xl font-semibold text-white mb-20">
            <span className="text-6xl block mb-5 w-full">
              EXCLUSIVE NEW SHOES
            </span>
            UP TO 30% ALL SHOES AND PRODUCTS
          </h1>
    
          <div className="mt-4">
            <a
              href="#contact"
              className="px-6 py-4 text-lg tracking-wider transition-all duration-300 ease-in-out text-white bg-transparent border-4 md:px-8 hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              <span>SHOP NOW</span>
            </a>
          </div>
        </div>

        <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0 animate-pulse">
          <img
            id="heroImg1"
            className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
            src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
            alt="Awesome hero page image"
            width="500"
            height="488"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
