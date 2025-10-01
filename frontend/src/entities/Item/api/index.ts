import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IItem } from "@entities/Item/types";
import { ApiEndpoints } from "@utils/constants";

export interface ILoadItemsResponse {
    items: IItem[];
}

export const itemApi = createApi({
    reducerPath: "itemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    }),
    endpoints: (builder) => ({
        loadItems: builder.query<ILoadItemsResponse, void>({
            query: () => ApiEndpoints.ITEMS,
        }),
    }),
});

export const { useLoadItemsQuery } = itemApi;
