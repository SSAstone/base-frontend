import axios, { AxiosError } from "axios";

const instance = axios.create({
    baseURL: process.env.backendUrl,
});

instance.interceptors.request.use(
    (config: any) => {
        // const token = localStorage.getItem('accessToken');
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;

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
            return Promise.reject(error);
        } else if (error.request) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default instance;
