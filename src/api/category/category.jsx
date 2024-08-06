import axios from 'axios'

const api_url = "http://localhost:8080/api/categories"


export const getCategories = async () => {
    try {
        const response = await axios.get(api_url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${api_url}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createCategory = async (category) => {
    try {
        const response = await axios.post(`${api_url}/create`, category);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`${api_url}/update/${id}`, category);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${api_url}/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}