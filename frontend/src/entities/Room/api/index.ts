import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IRoom } from "@entities/Room/types";
import { ApiEndpoints } from "@utils/constants";

export interface ILoadRoomsResponse {
    rooms: IRoom[];
}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    }),
    endpoints: (builder) => ({
        loadRooms: builder.query<ILoadRoomsResponse, void>({
            query: () => ApiEndpoints.ROOMS,
        }),
    }),
});

export const { useLoadRoomsQuery } = roomApi;
