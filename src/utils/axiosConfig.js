import axios from 'axios';

// Create an Axios instance with a base URL and any default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8099/api', 
});

// Request interceptor to add the JWT token to every request's Authorization header
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) { //append it to the request headers
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => { //request error
        return Promise.reject(error);
    }
);

// Response interceptor to handle global response errors
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Clear local storage or any state management token storage
            localStorage.removeItem('authToken');

            // Redirect to login page or implement token refresh logic
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
