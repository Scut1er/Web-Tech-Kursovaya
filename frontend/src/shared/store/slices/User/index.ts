import { createSlice, Slice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserSlice {
    isAuthorized: boolean;
}

const initialState: IUserSlice = {
    isAuthorized: false,
};

const userSlice: Slice<IUserSlice> = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
    },
});

export const { setIsAuthorized } = userSlice.actions;

export default userSlice.reducer;
