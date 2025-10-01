import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IRoom } from "@entities/UserRooms/types";
import { ApiEndpoints } from "@utils/constants";
import { IItem } from "@entities/Item/types";

export interface IGetRoomDataBaseRequest {
    public_id: string;
}

export interface IMutationRoomDataBaseRequest {
    roomId: string;
    itemId: number;
}

export type TItemUserChangeData = Pick<IItem, "name" | "quantity" | "category">;

export interface IItemCreateRequest
    extends Omit<IMutationRoomDataBaseRequest, "itemId"> {
    itemUserChangeData: TItemUserChangeData;
}

export interface IItemUpdateRequest extends IMutationRoomDataBaseRequest {
    itemUserChangeData: TItemUserChangeData;
}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        credentials: "include",
    }),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        loadItems: builder.query<IItem[], IGetRoomDataBaseRequest>({
            query: (payload) =>
                `${ApiEndpoints.ROOMS}/${payload.public_id}/${ApiEndpoints.ITEMS}`,
            providesTags: ["Room"],
        }),
        createItem: builder.mutation<IItem, IItemCreateRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}`,
                method: "POST",
                body: payload.itemUserChangeData,
            }),
            invalidatesTags: ["Room"],
        }),
        updateItem: builder.mutation<IItem, IItemUpdateRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}/${payload.itemId}`,
                method: "PATCH",
                body: payload.itemUserChangeData,
            }),
            invalidatesTags: ["Room"],
        }),
        deleteItem: builder.mutation<void, IMutationRoomDataBaseRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}/${payload.itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Room"],
        }),
        toggleItemPurchased: builder.mutation<
            IRoom,
            IMutationRoomDataBaseRequest
        >({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}/${payload.itemId}/${ApiEndpoints.TOGGLE}`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Room"],
        }),
    }),
});

export const {
    useLoadItemsQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useToggleItemPurchasedMutation,
} = roomApi;
