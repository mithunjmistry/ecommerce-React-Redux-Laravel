import axios from "axios"

const axiosInstance = axios.create({
    baseURL: window.Laravel.base_url,
    timeout: 3000,
    headers: {'X-CSRF-TOKEN': window.Laravel.csrfToken, 'X-Requested-With': 'XMLHttpRequest'}
});

export default axiosInstance;