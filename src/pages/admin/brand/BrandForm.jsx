import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBrand, getBrandById, updateBrand } from "../../../api/brand/brand";
import BackButton from "../../../components/BackButton"

const BrandForm = ({ mode }) => {
  
  const navigate = useNavigate();
  const { id } = useParams();


  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchBrand = async () => {
        try {
          const brandData = await getBrandById(id);
          setFormData(brandData);
        } catch (error) {
          alert(error.toString());
        }
      };

      fetchBrand();
    }
  }, [mode, id])

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        console.log(formData)
        await createBrand(formData);
        alert("Brand created successfully");
      } else if (mode === "update") {
        await updateBrand(id, formData);
        alert("Brand updated successfully");
      }

      navigate("/admin/brands");
    } catch (error) {
      console.error(error)
      alert(error.response.data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-7">
      {mode === "create" ? "Add New Brand" : "Update Brand"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-700 capitalize">
            Brand Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
          />
        </div>
        <div className="flex justify-between items-center">
        <BackButton to="/admin/brands" />
          <button
            type="submit"
            className="w-5/6 ml-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {mode === "create" ? "Add Brand" : "Update Brand"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
