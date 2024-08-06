import axios from "axios";

const api_url = "http://localhost:8080/api/products";

export const getProducts = async (query) => {
  console.log(query)
  try {
    const url = query ? `${api_url}?${query}` : api_url;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductsPopular = async () => {
  try {
    const response = await axios.get(`${api_url}/popular`);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getProductByCode = async (code) => {
  try {
    const response = await axios.get(`${api_url}/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByBrand = async (brand) => {
  try {
    const response = await axios.get(`${api_url}/?brand=${brand}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${api_url}/?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product, images) => {
  console.log(product);
  console.log(images);

  const data = new FormData();
  data.append(
    "product",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );

  images.forEach((image, index) => {
    data.append("images", image);
  });
  try {
    const response = await axios.post(`${api_url}/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (product, images, code) => {
  console.log(product);
  console.log(images);
  console.log(code);
  const data = new FormData();
  data.append(
    "product",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );

  images.forEach((image, index) => {
    data.append("images", image);
  });
  try {
    const response = await axios.put(`${api_url}/update/${code}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
