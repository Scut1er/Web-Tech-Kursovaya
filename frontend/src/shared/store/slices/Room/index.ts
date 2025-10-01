import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import type { IItem } from "@entities/Item/types";
import { IRoom } from "@entities/UserRooms/types";
import { IRecipe } from "@entities/Recipe/type";

export interface IRoomSlice {
    data: IRoom | null;
    items: IItem[];
    recipes: IRecipe[];
}

const initialState: IRoomSlice = {
    data: null,
    items: [],
    recipes: [],
};

const roomSlice: Slice<IRoomSlice> = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomData: (state, action: PayloadAction<IRoom>) => {
            state.data = action.payload;
        },
        setRoomItems: (state, action: PayloadAction<IItem[]>) => {
            state.items = action.payload;
        },
        setRoomRecipes: (state, action: PayloadAction<IRecipe[]>) => {
            state.recipes = action.payload;
        },
    },
});

export const { setRoomData, setItems, setRoomRecipes } = roomSlice.actions;

export default roomSlice.reducer;
