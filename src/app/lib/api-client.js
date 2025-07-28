// lib/api-client.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api", // adjust if needed
    withCredentials: true, // enables cookie-based sessions
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add interceptors to attach auth headers
// apiClient.interceptors.request.use(...)

export default apiClient;
