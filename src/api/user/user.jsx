import axios from 'axios'
const api_url = "http://localhost:8080/api/users"

export const getAdmins = async () => {
    try {
        const response = await axios.get(`${api_url}/list-admin`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createAdmin = async (admin, avatar) => {
    const data = new FormData();
    data.append("admin", new Blob([JSON.stringify(admin)], {type: " application/json"}));
    data.append("imageAvatar", avatar)
    try {
        const response = await axios.post(`${api_url}/create-admin`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${api_url}/list-user`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${api_url}/create-user`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
}