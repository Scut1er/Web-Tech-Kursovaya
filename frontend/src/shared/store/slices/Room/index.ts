import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import type { IItem } from "@entities/Item/types";
import { IRoom } from "@entities/Room/types";

export interface IRoomSlice {
    data: IRoom | null;
    loadedItems: IItem[];
}

const initialState: IRoomSlice = {
    data: null,
    loadedItems: [],
};

const roomSlice: Slice<IRoomSlice> = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomData: (state, action: PayloadAction<IRoom>) => {
            state.data = action.payload;
        },
        setRoomItems: (state, action: PayloadAction<IItem[]>) => {
            state.loadedItems = action.payload;
        },
    },
});

export const { setRoomData, setItems } = roomSlice.actions;

export default roomSlice.reducer;
