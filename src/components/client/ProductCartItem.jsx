import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";

function ProductCartItem({ product, onChangeQuantity, onChangeSize, onDelete }) {
  const maxQuantity = 10;

  const handleDecrement = () => {
    if (product.quantity > 1) {
      onChangeQuantity(product.variantId, product.quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (product.quantity < maxQuantity) {
      onChangeQuantity(product.variantId, product.quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onChangeQuantity(product.variantId, value);
    }
  };

  const handleSizeChange = (e) => {
    console.log(e.target.value)
    onChangeSize(product.variantId, e.target.value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const totalPrice = product.price * product.quantity;

  return (
    <div className="flex gap-x-6 my-8 w-full pb-10 border-b-2 border-gray-600">
      <img
        className="w-44 h-44 bg-cover"
        src={product.imageUrl} // Cập nhật trường imageUrl
        alt={product.productName}
      />
      <div className="w-2/5">
        <p className="text-2xl font-bold break-words">{product.productName}</p>
        <p className="text-base font-bold text-gray-400 my-1">
          Price: <span className="font-normal">{formatNumber(product.price)} VND</span>
        </p>
        <div className="flex gap-16 mt-2">
          <div>
            <p className="text-base font-bold mb-2">Size</p>
            <select
              value={product.variantSize} // Đảm bảo giá trị không phải là đối tượng
              onChange={handleSizeChange}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.size}>
                  {variant.size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-base font-bold mb-2">Quantity</p>
            <div className="py-2 px-3 inline-block bg-white border border-gray-400 rounded-md">
              <div className="flex items-center gap-x-1.5">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-400 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <RemoveIcon style={{ fontSize: "20px" }} />
                </button>
                <input
                  className="w-10 bg-transparent text-base text-gray-800 text-center outline-none"
                  type="text"
                  value={product.quantity}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-400 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <AddIcon style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/5 flex flex-col items-end">
        <p className="text-xl font-bold text-red-500">{formatNumber(totalPrice)} VND</p>
        <p className="text-base text-red-500 italic">Available</p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="border p-2 cursor-pointer inline-block px-10 py-2">
            <FavoriteBorderOutlinedIcon style={{ fontSize: "25px" }} />
          </div>
          <div
            className="bg-slate-600 cursor-pointer text-white text-lg font-semibold p-2 inline-block px-10 py-2"
            onClick={() => onDelete(product.variantId, product.variantSize)}
          >
            <DeleteIcon style={{ fontSize: "25px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
