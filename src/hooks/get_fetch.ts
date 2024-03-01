"use client"
import { useQuery } from "@tanstack/react-query";
import instance from "./fetch";
import {  QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface FetchResult {
    data: any;
    isPending: boolean;
    isLoading: boolean;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<void, Error>>;
}

const useFetchGet = ({ url }: { url: string }) => {
    // const [data, setData] = useState<any>(null);
    const { isLoading, data, isPending, refetch } = useQuery({
        queryKey: [url],
        queryFn: async () => {
            const res = await instance.get(url);
            return res.data;
        }
    });
    
    return { data, isPending, isLoading, refetch } as FetchResult;
};

export default useFetchGet;


// useEffect(() => {
//     if (!isLoading && user) {
//         setData(user);
//     }
// }, [isLoading, user]);

