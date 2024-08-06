import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center flex-col my-24">
        <h1 className="text-8xl font-bold text-red-500 mb-5">404</h1>
        <div className="text-5xl font-bold mb-10">Page Cannot Be Found</div>
        <Link
          to={"/home"}
          className="px-6 py-4 text-lg tracking-wider transition-all duration-300 ease-in-out text-red-500 bg-transparent border-4 md:px-8 hover:bg-red-500 hover:text-white hover:border-red-500"
        >
          <span className="font-bold">Back to home</span>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
