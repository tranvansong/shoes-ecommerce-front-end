import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import BannerTitle from "../../components/client/BannerTitle";
import CartTable from "../../components/client/CartTable";

function CartPage() {
  return (
    <div>
      <Header />
      <BannerTitle title="Shopping Cart" />
      <CartTable />
      <Footer />
    </div>
  );
}

export default CartPage;
