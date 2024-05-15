import axios from "axios";

// Create an axios instance
export const API = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL
});

// Add the authorization to the request's headers if exist
const authInterceptor = (req) => {
    console.log(req)
    const token = JSON.parse(localStorage.getItem('token'));
    const accessToken = token?.token;
    const refreshToken = token?.refreshToken;
    // const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXNhaWhhcnNoMTgzMUBnbWFpbC5jb20iLCJpYXQiOjE3MTUyMzM5NzksImV4cCI6MTcxNTI1MTk3OX0.7A-gK2xn2gcMeLlUJPnSwVG47L75eEKcGN8y_G3Q3Ze1dPHYKS0juY0csw5hakJfPRlk9eGY4wMhvCXhpkD6ZQ";
    if (accessToken && refreshToken && !req.url.includes('auth')) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        req.headers["RefreshToken"] = refreshToken;
    }
    // console.log(req.headers)
    return req;
}

API.interceptors.request.use(authInterceptor);

// Handle the api's error
export const handleApiError = async (error) => {
    try {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};