import axios from "axios";
import { useAuthStore } from "../stores/useAuth.Store";
const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : './api',
    withCredentials: true,
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