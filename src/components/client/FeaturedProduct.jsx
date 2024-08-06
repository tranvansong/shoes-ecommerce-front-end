import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProductsPopular } from "../../api/product/product";

function FeaturedProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsPopular();
        setProducts(data);
      } catch (error) {
        console.log(data.response.data)
      }
    }
    fetchData();
  }, [])
  return (
    <div>
      <div className="mt-32">
        <div className="text-5xl font-bold text-center">Featured Items</div>
        <div className="flex w-full justify-around items-center flex-wrap mt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} widthClass="w-64" />
        ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
