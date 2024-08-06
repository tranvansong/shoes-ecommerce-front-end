import React, { useContext, useState } from "react";
import LocationSelector from "./LocationSelector";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function ShipmentDetails() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0); // Assuming you have a way to get discount

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const calculateTotal = () => {
    return getCartTotal() + shippingFee - discount;
  };

  return (
    <div className="my-12 px-10 flex gap-10">
      <div className="w-7/12">
        <div className="text-2xl font-bold px-5 py-3 bg-slate-100">
          Shipment Information
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border border-gray-200 text-base w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="p-2 border border-gray-200 text-base w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-200 text-base w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight"
          />
          <input
            type="text"
            placeholder="Address"
            className="p-2 border border-gray-200 text-base w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-5  outline-none focus:border-bluelight"
          />
          <LocationSelector />
        </div>
        <div>
          <div className="text-xl font-bold px-5 py-3 bg-slate-100 mt-5">
            Shipping Methods
          </div>
          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="express-radio"
                type="radio"
                value="50000"
                name="shipping-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => setShippingFee(parseInt(e.target.value))}
              />
              <label htmlFor="express-radio" className="ms-3 text-gray-900">
                <LocalShippingOutlinedIcon />{" "}
                <span className="mx-2">Express delivery</span>
              </label>
            </div>
            <div className="font-bold text-base">50.000 VND</div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="standard-radio"
                type="radio"
                value="30000"
                name="shipping-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => setShippingFee(parseInt(e.target.value))}
              />
              <label htmlFor="standard-radio" className="ms-3 text-gray-900">
                <DeliveryDiningOutlinedIcon />{" "}
                <span className="mx-2">Standard delivery</span>
              </label>
            </div>
            <div className="font-bold text-base">30.000 VND</div>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-xl font-bold px-5 py-3 bg-slate-100 mt-5">
            Payment Methods
          </div>
          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="cod-radio"
                type="radio"
                value=""
                name="payment-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor="cod-radio" className="ms-3 text-gray-900">
                <span className="mx-2">Cash On Delivery</span>
              </label>
              <SourceOutlinedIcon />{" "}
            </div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="qr-radio"
                type="radio"
                value=""
                name="payment-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor="qr-radio" className="ms-3 text-gray-900">
                <span className="mx-2">Pay by MasterCard/Visa/QR Code</span>
              </label>
              <QrCodeOutlinedIcon /> <CreditCardOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/12">
        <div className="bg-slate-100 p-5">
          <div>
            <h1 className="font-bold border-b-2 border-slate-700 text-2xl pb-4">
              Order
            </h1>
            <div className="space-y-4 text-base">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between border-b py-2"
                >
                  <div>
                    {product.name} ({product.size})
                  </div>
                  <div>
                    {product.quantity} x {product.price.toLocaleString()} VND
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mt-5">
              <div>Subtotal:</div>
              <div>{formatNumber(getCartTotal())} VND</div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-5">
              <div>Shipping Fee:</div>
              <div>{formatNumber(shippingFee)} VND</div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-5">
              <div>Discount:</div>
              <div>{formatNumber(discount)} VND</div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-5">
              <div>Total:</div>
              <div>{formatNumber(calculateTotal())} VND</div>
            </div>
            <Link
              to=""
              className="mt-20 block uppercase font-bold text-xl bg-red-500 p-5 text-white text-center hover:text-white"
            >
              Complete order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipmentDetails;
