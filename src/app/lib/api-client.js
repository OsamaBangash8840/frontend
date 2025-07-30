import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://65.1.112.2:7000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/user/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;