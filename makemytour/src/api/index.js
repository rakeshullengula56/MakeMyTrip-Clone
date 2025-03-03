import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export const signup = async (firstName, lastName, email, password, phoneNumber) => {
    try {
        const response = await axios.post("http://localhost:8080/user/signup", {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        return response.data;
    } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:8080/user/login?email=${email}&password=${password}`);
        console.log("Login response:", response.data);  // ✅ Log API response
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};
