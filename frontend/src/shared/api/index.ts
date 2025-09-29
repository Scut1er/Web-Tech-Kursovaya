import { type AxiosRequestConfig } from "axios";
import { TApiMethods } from "@utils/constants";
import { axiosApi } from "@shared/axios";

class API {
    public static apiRequest(
        method: TApiMethods,
        url: string,
        body?: any,
        config?: AxiosRequestConfig<any>
    ) {
        return axiosApi.request({
            method,
            url,
            data: body,
            headers: {
                ...config?.headers,
            },
            ...config,
        });
    }
}

export default API;
