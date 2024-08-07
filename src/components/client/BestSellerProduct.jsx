import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProductsPopular } from "../../api/product/product";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { CartContext } from "../../context/CartContext";

function BestSellerProduct() {
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsPopular();
        setProducts(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

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
    <div>
      <div className="mt-32">
        <div className="text-5xl font-bold text-center">Best Seller</div>
        <div className="flex w-full justify-around items-center flex-wrap mt-10">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              widthClass="w-64" 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
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

export default BestSellerProduct;
