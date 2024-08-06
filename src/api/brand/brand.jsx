import axios from "axios"

const api_url = "http://localhost:8080/api/brands"

export const getBrands = async () => {
    try {
        const response = await axios.get(api_url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBrandById = async (id) => {
    try {
        const response = await axios.get(`${api_url}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createBrand = async (brand) => {
    console.log(brand)
    try {
        const response = await axios.post(`${api_url}/create`, brand);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateBrand = async (id, brand) => {
    try {
        const response = await axios.put(`${api_url}/update/${id}`, brand);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBrand = async (id) => {
    try {
        const response = await axios.delete(`${api_url}/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}