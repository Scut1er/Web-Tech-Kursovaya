import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IRoom } from "@entities/Room/types";
import { ApiEndpoints } from "@utils/constants";

export interface IJoinRoomRequest {
    public_id: string;
}

export interface ICreateRoomRequest {
    name: string;
}

export interface IDeleteRoomRequest {
    public_id: string;
}

export const userRoomsApi = createApi({
    reducerPath: "userRoomsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        credentials: "include",
    }),
    tagTypes: ["Rooms"],
    endpoints: (builder) => ({
        loadRooms: builder.query<IRoom[], void>({
            query: () => ApiEndpoints.ROOMS_MY,
            providesTags: ["Rooms"],
        }),
        createRoom: builder.mutation<IRoom, ICreateRoomRequest>({
            query: (payload) => ({
                url: ApiEndpoints.ROOM_CREATE,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Rooms"],
        }),
        deleteRoom: builder.mutation<void, IDeleteRoomRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/${payload.public_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Rooms"],
        }),
        joinRoom: builder.mutation<IRoom, IJoinRoomRequest>({
            query: (payload) => ({
                url: `${ApiEndpoints.ROOMS}/join`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useLoadRoomsQuery,
    useCreateRoomMutation,
    useDeleteRoomMutation,
    useJoinRoomMutation,
} = userRoomsApi;
