import { AxiosResponse, type AxiosRequestConfig } from "axios";
import { TApiMethods } from "@utils/constants";
import { axiosApi } from "@shared/axios";

class API {
    public static async apiRequest<TResponse, TBody>(
        method: TApiMethods,
        url: string,
        body?: TBody,
        config?: AxiosRequestConfig<TBody>
    ): Promise<TResponse> {
        const response: AxiosResponse = await axiosApi.request({
            method,
            url,
            data: body,
            headers: {
                ...config?.headers,
            },
            ...config,
            withCredentials: true,
        });

        return response.data;
    }
}

export default API;
