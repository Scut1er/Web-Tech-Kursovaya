import { createSlice, type Slice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@entities/User/types";

export interface IUserSlice {
    data: IUser | null;
    isUserAuthorized: boolean;
}

const initialState: IUserSlice = {
    data: null,
    isUserAuthorized: false,
};

const userSlice: Slice<IUserSlice> = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload;
        },
        setIsUserAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isUserAuthorized = action.payload;
        },
        updateAuthSession: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload;
            state.isUserAuthorized = true;
        },
        resetSession: (state, _action: PayloadAction<null>) => {
            state.isUserAuthorized = false;
            state.data = null;
        },
    },
});

export const { setData, setIsUserAuthorized, updateAuthSession, resetSession } =
    userSlice.actions;

export default userSlice.reducer;
