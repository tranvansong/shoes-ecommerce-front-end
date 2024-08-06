import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Dùng useHistory nếu bạn đang dùng React Router v5
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import BannerTitle from "../../components/client/BannerTitle";
import ProductSideBar from "../../components/client/ProductSideBar";
import ProductList from "../../components/client/ProductList";

function ProductPage() {
  const navigate = useNavigate(); // Dùng useHistory nếu bạn đang dùng React Router v5
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    sizes: [],
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    updateURLWithFilters(filters);
  };

  const updateURLWithFilters = (filters) => {
    const query = new URLSearchParams();

    if (filters.categories.length > 0) {
      query.set('categories', filters.categories.join(','));
    }
    if (filters.brands.length > 0) {
      query.set('brands', filters.brands.join(','));
    }
    if (filters.minPrice) {
      query.set('minPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      query.set('maxPrice', filters.maxPrice);
    }
    if (filters.sizes.length > 0) {
      query.set('sizes', filters.sizes.join(','));
    }

    navigate(`?${query.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filtersFromURL = {
      categories: params.get('categories') ? params.get('categories').split(',') : [],
      brands: params.get('brands') ? params.get('brands').split(',') : [],
      minPrice: params.get('minPrice') || "",
      maxPrice: params.get('maxPrice') || "",
      sizes: params.get('sizes') ? params.get('sizes').split(',') : [],
    };
    setFilters(filtersFromURL);
    setAppliedFilters(filtersFromURL);
  }, []);

  return (
    <div>
      <Header />
      <BannerTitle title={"Product"} />
      <div className="flex gap-x-8 px-6 mt-10">
        <ProductSideBar filters={filters} updateFilters={updateFilters} applyFilters={applyFilters} />
        <ProductList filters={appliedFilters} />
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
