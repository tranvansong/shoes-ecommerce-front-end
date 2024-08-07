import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { getProducts } from "../../api/product/product";
import LoadingSpinner from "../LoadingSpinner";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { CartContext } from "../../context/CartContext";

function ProductList({ filters }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let query = '';
        if (filters.brands.length) {
          query += `brands=${filters.brands.join(',')}&`;
        }
        if (filters.categories.length) {
          query += `categories=${filters.categories.join(',')}&`;
        }
        if (filters.minPrice) {
          query += `minPrice=${filters.minPrice}&`;
        }
        if (filters.maxPrice) {
          query += `maxPrice=${filters.maxPrice}&`;
        }
        if (filters.sizes.length) {
          query += `sizes=${filters.sizes.join(',')}&`;
        }
        
        if (query.endsWith('&')) {
          query = query.slice(0, -1);
        }
        
        const data = await getProducts(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleAddToCart = (product, size) => {
    const variant = product.variants.find(v => v.size === size);
    if (variant) {
      const cartItem = {
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        variantSize: variant.size,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrls[0],
        variants: product.variants
      };
      console.log(cartItem);

      addToCart(cartItem);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="w-4/5">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex text-lg font-medium rounded justify-between items-center p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <div>Total: {products.length} products</div>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="hover:text-red-500">
            <GridViewIcon style={{ fontSize: "35px" }} />
          </div>
          <div className="hover:text-red-500">
            <ViewListIcon style={{ fontSize: "35px" }} />
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <span>Sort by:</span>
          <select className="bg-gray-50 text-base border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 block p-2 pr-5 outline-none">
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-x-6 flex-wrap">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            widthClass="w-52" 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Đặt vị trí thông báo ở góc phải trên
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          Thêm vào giỏ hàng thành công
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductList;
