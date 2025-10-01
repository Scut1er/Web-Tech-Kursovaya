import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import type { IItem } from "@entities/Item/types";

export interface IRoomSlice {
    loadedItems: IItem[];
}

const initialState: IRoomSlice = {
    loadedItems: [],
};

const roomSlice: Slice<IRoomSlice> = createSlice({
    name: "room",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<IItem[]>) => {
            state.loadedItems = action.payload;
        },
    },
});

export const { setItems } = roomSlice.actions;

export default roomSlice.reducer;
