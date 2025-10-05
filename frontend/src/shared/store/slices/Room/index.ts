import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import { IRoom } from "@entities/UserRooms/types";

export interface IRoomSlice {
    data: IRoom | null;
}

const initialState: IRoomSlice = {
    data: null,
};

const roomSlice: Slice<IRoomSlice> = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomData: (state, action: PayloadAction<IRoom>) => {
            state.data = action.payload;
        },
        clearRoomData: (state, action: PayloadAction<null>) => {
            state.data = action.payload;
        },
    },
});

export const { setRoomData, clearRoomData } = roomSlice.actions;

export default roomSlice.reducer;
