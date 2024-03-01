import axios from "axios";

const instance = axios.create({
    baseURL: process.env.backendUrl,
});

instance.interceptors.request.use(
    (config: any) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
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
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
