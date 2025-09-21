import { createSlice, Slice, PayloadAction } from "@reduxjs/toolkit";

export interface IApplicationSlice {
    isLoading: boolean;
}

const initialState: IApplicationSlice = {
    isLoading: false,
};

const applicationSlice: Slice<IApplicationSlice> = createSlice({
    name: "application",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = applicationSlice.actions;

export default applicationSlice.reducer;
