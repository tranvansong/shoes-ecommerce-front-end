import React from "react";
import Header from "../../components/client/Header";
import Banner from "../../components/client/Banner";
import Collection from "../../components/client/Collection";
import Banner2 from "../../components/client/Banner2";
import BestSellerProduct from "../../components/client/BestSellerProduct";
import FeaturedProduct from "../../components/client/FeaturedProduct";
import Footer from "../../components/client/Footer";

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <Collection />
      <FeaturedProduct/>
      <Banner2/>
      <BestSellerProduct/>
      <Footer />
    </div>
  );
}

export default HomePage;