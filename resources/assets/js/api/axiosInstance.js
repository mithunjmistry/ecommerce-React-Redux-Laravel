import axios from "axios"
import {ACCESS_TOKEN} from "./strings";

const axiosInstance = axios.create({
    baseURL: window.Laravel.base_url,
    timeout: 8000,
    headers: {'X-CSRF-TOKEN': window.Laravel.csrfToken, 'X-Requested-With': 'XMLHttpRequest'}
});

export const getHeaders = (access_token) => (
    {Accept: "application/json", Authorization: `Bearer ${access_token}`}
);

export default axiosInstance;