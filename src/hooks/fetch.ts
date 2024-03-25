import axios, { AxiosError } from "axios";

const instance = axios.create({
    baseURL: process.env.backendUrl,
});

instance.interceptors.request.use(
    (config: any) => {
        // const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            }
        }
        return config;
    }
)

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            console.log("Response error status:", error.response.status);
            console.log("Response error data:", error.response.data);
            return Promise.reject(error);
            
        } else if (error.request) {
            return Promise.reject(error);
            console.log("Request error:", error.request);
        } else {
            console.log("Request setup error:", error.message);
            return Promise.reject(error);
        }
        
        return Promise.reject(error);
    }
);

export default instance;
