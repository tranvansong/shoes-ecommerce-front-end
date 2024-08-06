import React, { useCallback, useEffect, useState } from "react";
import { getBrands } from "../../../api/brand/brand";
import { getCategories } from "../../../api/category/category";
import { getSizes } from "../../../api/size/size";
import { createProduct } from "../../../api/product/product";
import { useDropzone } from "react-dropzone";
import BackButton from "../../../components/BackButton";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function NewProductForm() {
  const [form, setForm] = useState({
    name: "",
    productCode: "",
    categoryId: "",
    brandId: "",
    price: "",
    stock_quantity: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [name]: value } : variant
    );
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { sizeId: "", quantity: "" }]);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (images.length < 3) {
      valid = false;
      newErrors.images = "You need to add at least 3 images";
    }

    setErrors(newErrors);
    return valid;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => {
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });
    setImages(prevImages => [...prevImages, ...newImages.map(img => img.file)]);
    setImagePreviews(prevPreviews => [...prevPreviews, ...newImages.map(img => img.preview)]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] }, 
    multiple: true 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        const brands = await getBrands();
        const sizes = await getSizes();
        setCategories(categories);
        setBrands(brands);
        setSizes(sizes);
      } catch (error) {
        console.error("Error fetching categories, brands, and sizes:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true); // Start loading
    try {
      await createProduct({ ...form, variants }, images);
      alert("Product created successfully");
    } catch (error) {
      alert("Error creating product: " + error.response.data);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        <h2 className="text-3xl font-bold mb-7">Add New Product</h2>
        <form className="grid gap-6 grid-cols-2" onSubmit={handleSubmit}>
          <div className="bg-white flex flex-col rounded-xl shadow-md p-6">
            <fieldset className="name">
              <div className="text-lg font-bold mb-4">
                Product name <span className="text-orange">*</span>
              </div>
              <input
                className="mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="code">
              <div className="text-lg font-bold mb-4">
                Product code <span className="text-orange">*</span>
              </div>
              <input
                className="mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                type="text"
                name="productCode"
                placeholder="Enter product code"
                value={form.productCode}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <div className="gap-3 grid grid-cols-2 mb-8">
              <fieldset className="category">
                <div className="text-lg font-bold mb-4">
                  Category <span className="text-orange">*</span>
                </div>
                <div className="select">
                  <select
                    name="categoryId"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    value={form.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <fieldset className="brand">
                <div className="text-lg font-bold mb-4">
                  Brand <span className="text-orange">*</span>
                </div>
                <div className="select">
                  <select
                    name="brandId"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    value={form.brandId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            </div>
            <div className="gap-3 grid grid-cols-2 mb-4">
              <fieldset className="price">
                <div className="text-lg font-bold mb-4">
                  Price (VND) <span className="text-orange">*</span>
                </div>
                <input
                  className="mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>
              <fieldset className="stock_quantity">
                <div className="text-lg font-bold mb-4">
                  Stock quantity <span className="text-orange">*</span>
                </div>
                <input
                  className="mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                  type="number"
                  name="stock_quantity"
                  placeholder="Enter quantity"
                  value={form.stock_quantity}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>
            </div>
          </div>
          <div className="bg-white flex flex-col rounded-xl shadow-md p-6">
            <fieldset className="description">
              <div className="text-lg font-bold mb-4">
                Description <span className="text-orange">*</span>
              </div>
              <textarea
                className="mb-8 block w-full p-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                name="description"
                rows={6}
                placeholder="Description"
                value={form.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </fieldset>
            <fieldset className="mb-10">
              <div className="text-lg font-bold mb-4">Upload images</div>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-3 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p>Choose images</p>
              </div>
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-28 h-28 m-2">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute z-10 -top-0.5 -right-0.5 flex justify-center items-center w-5 h-5 rounded-full bg-orange text-white"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
            </fieldset>
            <div className="my-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold mb-4">Product Variants</div>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="block text-blue-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base my-4"
                >
                  <AddCircleOutlineIcon style={{fontSize: "30px"}}/>
                </button>
              </div>
              {variants.map((variant, index) => (
                <div key={index} className="mb-4 flex items-center gap-4">
                  <DeleteOutlineIcon className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoveVariant(index)} />
                  <select
                    name="sizeId"
                    value={variant.sizeId}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                  >
                    <option value="">Choose Size</option>
                    {sizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.size}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="quantity"
                    value={variant.quantity}
                    onChange={(e) => handleVariantChange(index, e)}
                    placeholder="Quantity"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="gap-10 grid grid-cols-2">
              <button
                className="tf-button w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                Add product
              </button>
              <BackButton to={"/admin/products"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProductForm;
