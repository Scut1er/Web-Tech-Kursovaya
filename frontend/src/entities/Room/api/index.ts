import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRoomParticipant } from "@entities/User/types";
import { type IRoom } from "@entities/UserRooms/types";
import { ApiEndpoints } from "@utils/constants";
import { IDish } from "@entities/Recipe/type";
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

export interface IRecipesResponse {
    provider: string;
    dishes: IDish[];
}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        credentials: "include",
    }),
    tagTypes: ["RoomItems", "RoomRecipes", "RoomParticipants"],
    endpoints: (builder) => ({
        loadItems: builder.query<IItem[], IGetRoomDataBaseRequest>({
            query: (payload) =>
                `${ApiEndpoints.ROOMS}/${payload.public_id}/${ApiEndpoints.ITEMS}`,
            providesTags: ["RoomItems"],
        }),
        loadRecipes: builder.query<IRecipesResponse, IGetRoomDataBaseRequest>({
            query: (payload) =>
                `${ApiEndpoints.ROOMS}/${payload.public_id}/${ApiEndpoints.AI_RECIPES}?provider=mistral`,
            providesTags: ["RoomRecipes"],
        }),
        loadParticipants: builder.query<
            TRoomParticipant[],
            IGetRoomDataBaseRequest
        >({
            query: (payload) =>
                `${ApiEndpoints.ROOMS}/${payload.public_id}/${ApiEndpoints.MEMBERS}`,
            providesTags: ["RoomParticipants"],
        }),
        createItem: builder.mutation<IItem, IItemCreateRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}`,
                method: "POST",
                body: payload.itemUserChangeData,
            }),
            invalidatesTags: ["RoomItems"],
        }),
        updateItem: builder.mutation<IItem, IItemUpdateRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}/${payload.itemId}`,
                method: "PATCH",
                body: payload.itemUserChangeData,
            }),
            invalidatesTags: ["RoomItems"],
        }),
        deleteItem: builder.mutation<void, IMutationRoomDataBaseRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.roomId}/${ApiEndpoints.ITEMS}/${payload.itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RoomItems"],
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
            invalidatesTags: ["RoomItems"],
        }),
    }),
});

export const {
    useLoadItemsQuery,
    useLoadRecipesQuery,
    useLoadParticipantsQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useToggleItemPurchasedMutation,
} = roomApi;
