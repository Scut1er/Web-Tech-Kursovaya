import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import type { IProduct } from "@entities/Item/types";

export interface IRoomSlice {
    loadedProducts: IProduct[];
}

const initialState: IRoomSlice = {
    loadedProducts: [],
};

const roomSlice: Slice<IRoomSlice> = createSlice({
    name: "room",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.loadedProducts = action.payload;
        },
    },
});

export const { setProducts } = roomSlice.actions;

export default roomSlice.reducer;
