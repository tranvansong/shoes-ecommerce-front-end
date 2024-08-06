import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

function ProductCard({ product, widthClass }) {
  return (
    <div
      className={`${widthClass} h-72 my-4 flex flex-col rounded-md overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-100 bg-white shadow-md relative group`}
    >
      <Link to={`/products/${product.productCode}`} className="flex flex-col h-full">
        <img
          className="h-1/2 w-full object-cover"
          src={product.imageUrls[0]}
          alt={product.name}
        />
        <div className="mt-4 px-5 pb-5">
          <div >
            <h5 className="text-md font-bold text-slate-900 truncate">
              {product.name}
            </h5>
            <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 opacity-0 w-36 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded py-1 px-2 z-10">
              {product.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"></div>
            </div>
          </div>
          <div className="my-3 flex items-center justify-between">
            <p>
              <span className="text-md font-bold text-red-500">
                {product.price.toLocaleString()} VND
              </span>
            </p>
          </div>
          <button className="flex items-center justify-center bg-red-500 px-2 py-1 text-sm text-white transition hover:bg-red-600">
            <ShoppingCartIcon className="mr-2" />
            Add to cart
          </button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
