import React from "react";
import ProductCard from "./ProductCard";

function BestSellerProduct() {
  
  return (
    <div>
      <div className="mt-28">
        <div className="text-5xl font-bold text-center">Related Product</div>
        <div className="flex w-full justify-around items-center flex-wrap mt-10">
          <ProductCard widthClass="w-64" />
          <ProductCard widthClass="w-64" />
          <ProductCard widthClass="w-64" />
          <ProductCard widthClass="w-64" />
        </div>
      </div>
    </div>
  );
}

export default BestSellerProduct;
