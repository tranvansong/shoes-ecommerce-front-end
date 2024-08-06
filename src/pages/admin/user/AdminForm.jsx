import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import BackButton from "../../../components/BackButton";
import { getRoles } from "../../../api/role/role";
import { createAdmin } from "../../../api/user/user";

const AdminForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    roles: [],
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await getRoles();
        const filteredRoles = roles.filter(role => role.name !== "USER");
        console.log(filteredRoles)
        setRolesData(filteredRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] } });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "phone") {
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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.phone.length !== 10) {
      valid = false;
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (formData.roles.length === 0) {
      valid = false;
      newErrors.roles = "At least one role must be selected";
    }

    if (formData.password.length < 6) {
      valid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!avatar) {
      valid = false;
      newErrors.avatar = "Avatar is required";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createAdmin(formData, avatar);
      alert("Admin created successfully");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-3xl font-bold text-gray-800 mb-5">Create New Admin</h1>
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
                  />
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
                  />
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
                />
              </div>

              <div className="mt-4">
                <label htmlFor="phone" className="block text-base font-bold text-gray-700 mb-1">
                  Phone <span className="text-orange">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
                />
              </div>

              <div className="mt-4">
                <label htmlFor="avatar" className="block text-base font-bold text-gray-700 mb-1">
                  Avatar <span className="text-orange">*</span>
                </label>
                <div {...getRootProps()} className="border-dashed border-2 border-gray-400 rounded-lg p-4 text-center cursor-pointer">
                  <input {...getInputProps()} name="avatar" />
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="mx-auto w-32 h-32 object-cover rounded-full" />
                  ) : (
                    <p>Drag & drop an image, or click to select one</p>
                  )}
                </div>
                {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
              </div>

              <div className="mt-4">
                <h3 className="mb-5 text-base font-medium text-gray-900">Choose Roles:</h3>
                <ul className="flex justify-between items-center flex-wrap">
                  {rolesData.map((role) => (
                    <li key={role.id}>
                      <input
                        type="checkbox"
                        id={role.id}
                        name="roles"
                        value={role.name}
                        checked={formData.roles.includes(String(role.name))}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={role.id}
                        className="inline-flex items-center justify-between w-full p-3 mb-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                      >
                        <div className="block">
                          <div className="w-full text-sm font-semibold">{role.name}</div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
                {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <BackButton to={"/admin/users/admins"} />
              <button type="submit" className="bg-bluelight text-white px-4 py-2 rounded-lg text-base font-bold hover:bg-blue-700">
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
