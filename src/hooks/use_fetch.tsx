import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "./fetch";
import { message, notification } from "antd";
import { getQueryClient } from "@/providers/fetch_provider";


class ApiFetcher {
    Get(url: string) {
        const { isLoading, data, refetch } = useQuery({
            queryKey: [url],
            queryFn: async () => {
                    const res = await instance.get(url);
                    return res.data;
            }
        });
    
        const getData = async (params: any) => {
            const queryData = await getQueryClient().fetchQuery({
                queryKey: [url, params && params],
                queryFn: async () => {
                    const res = await instance.get(url + (params ? `${params}` : ''));
                    return res.data;
                }
            });
            return queryData;
        }
        return { data, isLoading, refetch, getData };
    }



    Post(url: string, options?: any) {
        try {
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
                    options && (options?.message ? message.success(options?.message)
                        : message.success(data.message));

                    options && { ...options }
                },
                onError: (error: any) => {
                    error?.response?.data?.data?.issues ? message.error(error?.response?.data?.data?.issues?.map((err: any) => err.message)) : message.error(error?.message);
                }
            });
            const { isSuccess, isPending, isError, error, data: postData } = mutation;
            return { mutation, isSuccess, isPending, isError, error, postData };
        } catch (error) {
            console.log(error)
        }
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
                    Object.keys(event).forEach(key => {
                        const value = event[key];
                        if (Array.isArray(value)) {
                            value.forEach((file, index) => {
                                formData.append(`${key}${index}`, file);
                            });
                        } else {
                            formData.append(key, value);
                        }
                    });
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
        const { isSuccess, isPending, isError, error, data: postFormData } = mutation;

        return { mutation, postFormData, isSuccess, isPending, isError, error };
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


export const deleteData = async (url: string, options?: any) => {
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


export const queryData = getQueryClient().fetchQuery({
    queryKey: ["6625628a71b3af7ce2b82c48"],
    queryFn: async () => {
        return await instance.get("/product/6625628a71b3af7ce2b82c48");
    },
})


export const useGet = (url: string, params?: any) => {
    const { isLoading, data, refetch } = useQuery({
        queryKey: [url, params && params],
        queryFn: async () => {
            if (params) {
                const res = await instance.get(url + `${params && `/${params}`}`);
                return res.data;
            } else {
                const res = await instance.get(url);
                return res.data;
            }
        }
    });

    const getData = async (params: any) => {
        
        const queryData = await getQueryClient().fetchQuery({
            queryKey: [url, params && params],
            queryFn: async () => {
                const res = await instance.get(url + (params ? `/${params}` : ''));
                return res.data;
            }
        });
        return queryData;
    }
    return { data, isLoading, refetch, getData };
}

