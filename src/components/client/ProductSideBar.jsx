import React, { useEffect, useState } from "react";
import { getSizes } from "../../api/size/size";
import { getBrands } from "../../api/brand/brand";
import { getCategories } from "../../api/category/category";
import { getProductsByBrand, getProductsByCategory } from "../../api/product/product";

function ProductSideBar({ filters, updateFilters, applyFilters }) {
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandCounts, setBrandCounts] = useState({});
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const sizesData = await getSizes();
        setSizes(sizesData);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    const fetchBrandsAndCounts = async () => {
      try {
        const brandsData = await getBrands();
        const counts = {};
        const filteredBrands = [];
        for (const brand of brandsData) {
          const products = await getProductsByBrand(brand.name);
          if (products.length > 0) {
            counts[brand.name] = products.length;
            filteredBrands.push(brand);
          }
        }
        setBrands(filteredBrands);
        setBrandCounts(counts);
      } catch (error) {
        console.error("Error fetching brands and product counts:", error);
      }
    };

    const fetchCategoriesAndCounts = async () => {
      try {
        const categoriesData = await getCategories();
        const counts = {};
        const filteredCategories = [];
        for (const category of categoriesData) {
          const products = await getProductsByCategory(category.name);
          if (products.length > 0) {
            counts[category.name] = products.length;
            filteredCategories.push(category);
          }
        }
        setCategories(filteredCategories);
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching categories and product counts:", error);
      }
    };

    fetchSizes();
    fetchBrandsAndCounts();
    fetchCategoriesAndCounts();
  }, []);

  const handleFilterChange = (filterName, value) => {
    updateFilters({ [filterName]: value });
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value.replace(/\./g, ""); // Remove dots
    updateFilters({ [type]: value ? Number(value) : "" });
  };

  const applyFormattedFilters = () => {
    const formattedFilters = {
      ...filters,
      minPrice: filters.minPrice ? filters.minPrice.toString().replace(/\./g, "") : "",
      maxPrice: filters.maxPrice ? filters.maxPrice.toString().replace(/\./g, "") : ""
    };
    applyFilters(formattedFilters);
  };

  return (
    <div className="text-base w-1/4 p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Categories</h2>
        {categories.map((category, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <input
                id={`category-checkbox-${index}`}
                type="checkbox"
                className="w-4 h-4 accent-orange bg-gray-100 border-gray-300 rounded focus:ring-orange"
                checked={filters.categories.includes(category.name)}
                onChange={() => handleFilterChange(
                  'categories',
                  filters.categories.includes(category.name)
                    ? filters.categories.filter((c) => c !== category.name)
                    : [...filters.categories, category.name]
                )}
              />
              <label htmlFor={`category-checkbox-${index}`} className="text-base">
                {category.name}
              </label>
            </div>
            <div>({categoryCounts[category.name] || 0})</div>
          </div>
        ))}
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Brands</h2>
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <input
                id={`brand-checkbox-${index}`}
                type="checkbox"
                className="w-4 h-4 accent-orange bg-gray-100 border-gray-300 rounded focus:ring-orange"
                checked={filters.brands.includes(brand.name)}
                onChange={() => handleFilterChange(
                  'brands',
                  filters.brands.includes(brand.name)
                    ? filters.brands.filter((b) => b !== brand.name)
                    : [...filters.brands, brand.name]
                )}
              />
              <label htmlFor={`brand-checkbox-${index}`} className="text-base">
                {brand.name}
              </label>
            </div>
            <div>({brandCounts[brand.name] || 0})</div>
          </div>
        ))}
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Price</h2>
        <div className="flex justify-between">
          <input
            type="text"
            id="min"
            placeholder="Min"
            value={filters.minPrice ? formatNumber(filters.minPrice) : ""}
            onChange={(e) => handlePriceChange(e, 'minPrice')}
            className="w-1/2 px-2 py-1.5 text-gray-900 border text-base border-slate-500 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
            aria-describedby="helper-text-explanation"
          />
          <span className="mx-2">-</span>
          <input
            type="text"
            id="max"
            placeholder="Max"
            value={filters.maxPrice ? formatNumber(filters.maxPrice) : ""}
            onChange={(e) => handlePriceChange(e, 'maxPrice')}
            className="w-1/2 px-2 py-1.5 text-gray-900 border text-base border-slate-500 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
            aria-describedby="helper-text-explanation"
          />
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Size</h2>
        <div className="grid grid-cols-4 gap-3">
          {sizes.map((sizeObj, index) => (
            <div
              key={index}
              className={`cursor-pointer border text-base p-1 text-center rounded ${
                filters.sizes.includes(sizeObj.size)
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white border-slate-600"
              }`}
              onClick={() => handleFilterChange(
                'sizes',
                filters.sizes.includes(sizeObj.size)
                  ? filters.sizes.filter((s) => s !== sizeObj.size)
                  : [...filters.sizes, sizeObj.size]
              )}
            >
              {sizeObj.size}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="text-red-500 hover:text-white transition-all duration-200 border border-red-500 hover:bg-red-600 font-medium rounded-md py-2 px-7 text-center mb-2"
          onClick={applyFormattedFilters}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

export default ProductSideBar;
