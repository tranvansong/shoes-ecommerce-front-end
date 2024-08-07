import axios from 'axios'

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error.response;
    }
}