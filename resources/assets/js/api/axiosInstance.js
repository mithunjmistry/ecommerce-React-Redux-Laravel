import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 3000,
    headers: {'X-CSRF-TOKEN': window.Laravel.csrfToken}
});

export default axiosInstance;