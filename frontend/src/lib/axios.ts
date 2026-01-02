import axios from "axios";
import { useAuthStore } from "../stores/useAuth.Store";
import { API_BASE_URL } from "../constants";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 60000, // 60 seconds timeout for AI grading (default was 10s)
});

// Attach access token to outgoing requests. Use a request interceptor (not response).
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers = config.headers || {};
        // Axios headers can be a plain object; set Authorization header
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;