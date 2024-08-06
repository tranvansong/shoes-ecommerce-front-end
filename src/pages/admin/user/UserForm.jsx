import React, { useState } from "react";
import BackButton from "../../../components/BackButton";
import { createUser } from "../../../api/user/user";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "phoneNumber") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "roles") {
      if (checked) {
        setFormData({ ...formData, roles: [...formData.roles, value] });
      } else {
        setFormData({
          ...formData,
          roles: formData.roles.filter((role) => role !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createUser(formData);
      alert("Create user successfully");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-3xl font-bold text-gray-800 mb-5">Create New User</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="username" className="block text-base font-bold text-gray-700 mb-1">
                    Username <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div>
                  <label htmlFor="fullName" className="block text-base font-bold text-gray-700 mb-1">
                    Full Name <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-base font-bold text-gray-700 mb-1">
                  Email <span className="text-orange">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="phoneNumber" className="block text-base font-bold text-gray-700 mb-1">
                  Phone <span className="text-orange">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-base font-bold text-gray-700 mb-1">
                  Password <span className="text-orange">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-base font-bold text-gray-700 mb-1">
                  Address <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <BackButton to={"/admin/users"} />
              <button type="submit" className="bg-bluelight text-white px-4 py-2 rounded-lg text-base font-bold hover:bg-blue-700">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
