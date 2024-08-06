import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../../api/category/category";
import BackButton from "../../../components/BackButton";
const CategoryForm = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });
  useEffect(() => {
    if (mode === "update" && id) {
      const fetchCategory = async () => {
        try {
          const categoryData = await getCategoryById(id);
          setFormData(categoryData);
        } catch (error) {
          alert(error.toString());
        }
      };

      fetchCategory();
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await createCategory(formData);
        alert("Category created successfully");
      } else if (mode === "update") {
        await updateCategory(id, formData);
        alert("Category updated successfully");
      }

      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-7">
        {mode === "create" ? "Add New Category" : "Update Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-700 capitalize">
            Category Name
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
          <BackButton to="/admin/categories" />
          <button
            type="submit"
            className="w-full ml-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {mode === "create" ? "Add Category" : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
