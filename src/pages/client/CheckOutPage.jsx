import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import BannerTitle from "../../components/client/BannerTitle";
import { useLocation } from "react-router-dom";
import ShipmentDetails from "../../components/client/ShipmentDetails";

function CheckOutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  
  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const calculateTotal = () => {
    // Calculate total based on cartItems
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
      <Header />
      <BannerTitle title="Check Out" />
      <ShipmentDetails/>
      <Footer />
    </div>
  );
}

export default CheckOutPage;
