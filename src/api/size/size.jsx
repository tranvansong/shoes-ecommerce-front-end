import axios from "axios"

const api_url = "http://localhost:8080/api/products/sizes"

export const getSizes = async () => {
    try {
        const response = await axios.get(api_url);
        return response.data;
    } catch (error) {
        throw error;
    }
}
