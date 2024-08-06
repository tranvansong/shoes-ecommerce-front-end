import React, { useState, useEffect } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import BannerTitle from "../../components/client/BannerTitle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { getProductByCode } from "../../api/product/product";
import ImageSlideshow from "../../components/client/ImageSlideshow"; // Import component

function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTab, setSelectedTab] = useState("information");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByCode(code);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > 10) return 10;
      return newQuantity;
    });
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked with quantity:", quantity);
    console.log("Selected Size:", selectedSize);
  };

  const handleAddToCart = () => {
    console.log("Add to Cart clicked with quantity:", quantity);
    console.log("Selected Size:", selectedSize);
  };

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

  const handleHideReviewForm = () => {
    setShowReviewForm(false);
    setReviewText(""); // Clear the review text when hiding the form
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("Review submitted:", reviewText);
    setReviewText("");
    setShowReviewForm(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <BannerTitle title={"Product Details"} />
      <div>
        <div className="flex gap-12 mx-10 my-16 text-base">
          <div className="w-5/12">
            <ImageSlideshow images={product.imageUrls} />{" "}
            {/* Use ImageSlideshow here */}
          </div>

          <div className="w-7/12 text-lg">
            <h2 className="text-3xl font-semibold">{product.name}</h2>
            <div className="mt-4 flex items-center gap-x-16">
              <span className="font-semibold">
                Giá:{" "}
                <span className="text-red-500 ml-2">
                  {product.price.toLocaleString()} VND
                </span>
              </span>
              <span className="font-semibold">
                Đã bán:{" "}
                <span className="text-red-500 ml-2">
                  {product.sold_quantity}
                </span>
              </span>
              <span className="font-semibold">
                Còn lại:{" "}
                <span className="text-red-500 ml-2">
                  {product.stock_quantity}
                </span>
              </span>
            </div>
            <div className="mt-4 flex gap-5 items-center">
              <div>
                <span className="font-semibold">
                  Đánh giá: <span className="text-red-500 ml-2">
                  {product.average_rating || "Chưa có"} <span>({product.reviews.length})</span>
                </span>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-semibold">
                Thương hiệu: <span className="text-bluelight ml-2">{product.brand}</span>
              </span>
            </div>
            <div className="mt-4">
              <span className="font-semibold">
                Dòng sản phẩm: <span className="text-bluelight ml-2">{product.category}</span>
              </span>
            </div>
            <div className="mt-4">
              <div className="font-semibold pb-2">Size:</div>
              <div className="grid grid-cols-4 gap-4 w-5/12">
                {product.variants.map((variant) => (
                  <span
                    key={variant.id}
                    className={`border rounded-md text-center p-2 cursor-pointer ${
                      selectedSize === variant.size
                        ? "bg-blue-500 text-white"
                        : "border-slate-500"
                    }`}
                    onClick={() => setSelectedSize(variant.size)}
                  >
                    {variant.size}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="mt-4 flex items-center">
                <span className="font-bold mr-4">Quantity:</span>
                <div className="w-24 border border-gray-500 relative">
                  <input
                    type="text"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                      )
                    }
                    className="w-full text-base border border-b-gray-500 p-2 text-center outline-none"
                  />
                  <div className="w-full">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-1/2 text-xl font-bold border transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:border-red-500 border-r-gray-500"
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-1/2 border text-xl font-bold transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:border-red-500"
                      disabled={quantity === 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div
                onClick={handleAddToCart}
                className="bg-red-500 cursor-pointer transition-all duration-300 text-white text-lg font-semibold border-2 border-white px-7 py-3 hover:bg-white hover:text-red-500 hover:border-red-500"
              >
                Add to Cart
              </div>
              <div
                onClick={handleBuyNow}
                className="bg-blue-500 cursor-pointer transition-all duration-300 text-white text-lg font-semibold border-2 border-white px-7 py-3 hover:bg-white hover:text-blue-500 hover:border-blue-500"
              >
                Buy Now
              </div>
            </div>
          </div>
        </div>
        <nav className="border-t mt-10 pt-5">
          <ul className="flex justify-center gap-20 py-2 text-xl font-bold">
            <li
              className={`cursor-pointer ${
                selectedTab === "information"
                  ? "text-red-600 border-b-2 pb-4 border-red-600"
                  : ""
              }`}
              onClick={() => setSelectedTab("information")}
            >
              Information
            </li>
            <li
              className={`cursor-pointer ${
                selectedTab === "reviews"
                  ? "text-red-600 border-b-2 pb-4 border-red-600"
                  : ""
              }`}
              onClick={() => setSelectedTab("reviews")}
            >
              Reviews
            </li>
          </ul>
        </nav>
        <div className="mx-10 my-5 border-2 p-10">
          {selectedTab === "information" && (
            <div>
              <h3 className="text-2xl font-bold">Product Information</h3>
              <p className="mt-2">{product.description}</p>
            </div>
          )}

          {selectedTab === "reviews" && (
            <div className="border-2 p-10">
              <h3 className="text-2xl font-bold">Reviews</h3>
              <div className="my-2 border-b pb-5 border-b-slate-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <StarIcon style={{ color: "yellow" }} />
                    <StarIcon style={{ color: "yellow" }} />
                    <StarIcon style={{ color: "yellow" }} />
                    <StarIcon style={{ color: "yellow" }} />
                    <StarBorderIcon style={{ color: "yellow" }} />
                    <span className="ml-2">
                      {product.average_rating || "No reviews yet"}
                    </span>
                  </div>
                </div>
              </div>

              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="my-5 border-b pb-5 border-b-slate-300"
                  >
                    <h4 className="text-lg font-semibold">{review.name}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarIcon key={i} style={{ color: "yellow" }} />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <StarBorderIcon key={i} style={{ color: "yellow" }} />
                      ))}
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet</p>
              )}

              <button
                onClick={handleWriteReview}
                className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Write a Review
              </button>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mt-5">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-400 p-2 rounded"
                    placeholder="Write your review here"
                  ></textarea>
                  <div className="mt-3 flex gap-4">
                    <button
                      type="submit"
                      className="bg-green text-white px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleHideReviewForm}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;
