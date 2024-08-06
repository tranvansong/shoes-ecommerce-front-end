import React from 'react'

function Collection() {
  return (
    <div>
        <div className="flex justify-center space-x-32 items-center my-20 px-10">
          <div
            className="overflow-hidden block bg-[url('/images/banner1.webp')] bg-white bg-cover text-center pt-10 w-1/3 shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300" style={{height: "400px"}}
          >
            <p className="mb-2 text-3xl font-bold text-white">Sport Shoes</p>
          </div>
          <div
            className="overflow-hidden block bg-[url('/images/banner2.webp')] bg-white bg-cover text-center pt-10 w-1/3 shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300" style={{height: "400px"}}
          >
            <p className="mb-2 text-3xl font-bold text-white">Sport Shoes</p>
          </div>
          <div
            className="overflow-hidden block bg-[url('/images/banner3.webp')] bg-white bg-cover text-center pt-10 w-1/3 shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300" style={{height: "400px"}}
          >
            <p className="mb-2 text-3xl font-bold text-white">Sport Shoes</p>
          </div>
        </div>
      </div>
  )
}

export default Collection;