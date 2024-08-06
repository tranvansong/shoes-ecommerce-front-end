import React, { useContext } from "react";
import ProductCartItem from "./ProductCartItem";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function CartTable() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    changeQuantity,
    changeSize,
    clearCart,
    getCartTotal,
  } = useContext(CartContext);

  const handleChangeQuantity = (id, newQuantity) => {
    changeQuantity(id, newQuantity);
  };

  const handleChangeSize = (id, newSize) => {
    changeSize(id, newSize);
  };

  const handleDelete = (id) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      removeFromCart(product);
    }
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div>
      <div className="my-12 px-10 flex gap-10">
        <div className="w-7/12">
          <h1 className="bg-gray-200 font-semibold text-2xl p-4">Cart</h1>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <ProductCartItem
                key={product.id}
                product={product}
                onChangeQuantity={handleChangeQuantity}
                onChangeSize={handleChangeSize}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-10">Your cart is empty.</div>
          )}
          <div className="flex items-center justify-between mt-5">
            <Link
              to="/products"
              className="bg-gray-800 cursor-pointer transition-all duration-300 text-white text-lg font-semibold border border-gray-500 px-5 py-3 hover:bg-gray-900 hover:text-white"
            >
              Continue Shopping
            </Link>

            <button
              className="bg-gray-800 cursor-pointer transition-all duration-300 text-white text-lg font-semibold border border-gray-500 px-5 py-3 hover:bg-gray-900"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
        <div className="w-5/12">
          <div className="bg-slate-200 p-5">
            <div>
              <h1 className="bg-gray-200 font-bold border-b-2 border-slate-700 text-2xl pb-4">
                Order
              </h1>
              <div className="mt-5">
                <h2 className="font-bold text-lg uppercase mb-3">Coupon</h2>
                <div className="flex items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <input
                    className="text-lg outline-none w-4/5 px-3 py-2"
                    placeholder="Example input"
                    type="text"
                  />
                  <div className="bg-red-500 w-1/5 px-3 py-2 text-center text-white text-lg font-bold">
                    Apply
                  </div>
                </div>
              </div>
              <div className="mt-10 py-8 border-y-2 border-dashed border-gray-400">
                <div className="flex justify-between items-center text-lg text-slate-700 font-bold mb-2">
                  <div>Order</div>
                  <div>{formatNumber(getCartTotal())} VND</div>
                </div>
                <div className="flex justify-between items-center text-lg text-slate-700 font-bold">
                  <div>Giam</div>
                  <div className="font-normal">0 VND</div>
                </div>
              </div>
              <div>
                <div className="my-10 flex justify-between items-center text-2xl font-bold">
                  <div>Tam tinh</div>
                  <div>{formatNumber(getCartTotal())} VND</div>
                </div>
              </div>
              <Link
                to="/check-out"
                state={{ cartItems }} // Pass cart items as state
                className="mt-20 block uppercase font-bold text-xl bg-red-500 p-5 text-white text-center hover:text-white"
              >
                Process to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTable;
