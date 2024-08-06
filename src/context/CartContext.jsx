import React, { createContext, useEffect, useState } from "react";
import { cartItems as initialCartItems } from "../assets/data";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    initialCartItems
      ? initialCartItems
      : []
  );

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    console.log("Before removing:", cartItems);
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== product.id);
    console.log("After filtering:", updatedCartItems);
    setCartItems(updatedCartItems);
  };


  const changeSize = (id, newSize) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, size: newSize } : cartItem
      )
    );
  };

  const changeQuantity = (id, newQuantity) => {
    console.log("handleChangeQuantity called:", id, newQuantity);
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: newQuantity,
            }
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        changeSize,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
