import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "./fetch";
import { message, notification } from "antd";

class ApiFetcher {
    Get(url: string) {
        const { isLoading, data, refetch } = useQuery({
            queryKey: [url],
            queryFn: async () => {
                const res = await instance.get(url);
                return res.data;
            }
        });

        return { data, isLoading, refetch };
    }

    Post(url: string, options?: any) {
        const mutation = useMutation({
            mutationFn: async (event: any) => {
                try {
                    const response = await instance.post(url, event);
                    return response.data;
                } catch (error) {
                    throw error;
                }
            },
            onSuccess: (data) => {
                console.log("🚀 ~ ApiFetcher ~ Post ~ data:", data)
                options && (options?.message ? message.success(options?.message)
                    : message.success(data.message));

                options && { ...options }

            },

            onError: (error: any) => {
                console.log("🚀 ~ useFetch ~ Post ~ error:", error?.response?.data?.data?.issues.map((err: any) => err.message))
                error?.response?.data?.data?.issues ? message.error(error?.response?.data?.data?.issues?.map((err: any) => err.message)) : message.error(error?.message);
            }
        });
        const { isSuccess, isPending, isError, error } = mutation;

        return { mutation, isSuccess, isPending, isError, error };
    }

    Delete(url: string, options?: any) {
        return new Promise((resolve, reject) => {
            notification.open({
                message: options?.meg || "Are you sure?",
                description: options?.des || "Are you sure you want to delete this item?",
                btn: <button onClick={() => {
                    const handleClick = async () => {
                        try {
                            const response = await instance.delete(url);
                            notification.destroy();
                            resolve(response);
                        } catch (error) {
                            reject(error);
                        }
                    };
                    handleClick();
                }}>Yes</button>
            });
        });
    }

    formPost(url: string, options?: any) {
        const mutation = useMutation({
            mutationFn: async (event: any) => {
                try {

                    let formData = new FormData();
                    for (let key in event) {
                        formData.append(key, event[key]);
                    }

                    const response = await instance.post(url, formData);
                    return response.data;
                } catch (error) {
                    throw error;
                }
            },
            onSuccess: (data) => {
                options && (options?.message ? message.success(options?.message)
                    : message.success(data.message));
            },
            onError: (error: any) => {
                options && (options?.message ? message.error(options?.message)
                    : message.error(error?.response?.data?.data?.issues?.map((err: any) => err.message)));
            }
        });
        const { isSuccess, isPending, isError, error } = mutation;

        return { mutation, isSuccess, isPending, isError, error };
    }

    generateFetcher(url: string) {
        return {
            ...this.Get(url),
            ...this.Post(url),
            deleteData: (u: string) => this.Delete(url + u),
        }
    }
}

export default ApiFetcher;
