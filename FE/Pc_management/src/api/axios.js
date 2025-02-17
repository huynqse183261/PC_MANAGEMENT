import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7004/api/', // Thay thế bằng URL API của bạn
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add error handling for API calls
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Data:', error.response.data);
            console.error('Response Status:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message);
        }
        if (error.response.status === 401) {
            // Xử lý lỗi authentication
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api; 