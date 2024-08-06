import axios from "axios"

const api_url = "http://localhost:8080/api/roles"

export const getRoles = async () => {
    try {
        const response = await axios.get(api_url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createRole = async (role) => {
    try {
        const response = await axios.post(`${api_url}/create`, role);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getRoleById = async (id) => {
    try {
        const response = await axios.get(`${api_url}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (id, role) => {
    try {
        const response = await axios.put(`${api_url}/update/${id}`, role);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id) => {
    try {
        const response = await axios.delete(`${api_url}/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};