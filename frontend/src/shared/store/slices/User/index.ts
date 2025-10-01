import { createSlice, type Slice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserPersonalData } from "@entities/User/types";
import type { IRoom } from "@entities/Room/types";

export interface IUserPersonalDataSlice {
    personalData: IUserPersonalData | null;
    rooms: IRoom[];
    isUserAuthorized: boolean;
}

const initialState: IUserPersonalDataSlice = {
    personalData: null,
    rooms: [],
    isUserAuthorized: false,
};

const userSlice: Slice<IUserPersonalDataSlice> = createSlice({
    name: "user",
    initialState,
    reducers: {
        setPersonalData: (state, action: PayloadAction<IUserPersonalData>) => {
            state.personalData = action.payload;
        },
        setRooms: (state, action: PayloadAction<IRoom[]>) => {
            state.rooms = action.payload;
        },
        setIsUserAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isUserAuthorized = action.payload;
        },
        updateAuthSession: (
            state,
            action: PayloadAction<IUserPersonalData>
        ) => {
            state.personalData = action.payload;
            state.isUserAuthorized = true;
        },
        resetSession: (state, _action: PayloadAction<null>) => {
            state.isUserAuthorized = false;
            state.personalData = null;
        },
    },
});

export const {
    setPersonalData,
    setRooms,
    setIsUserAuthorized,
    updateAuthSession,
    resetSession,
} = userSlice.actions;

export default userSlice.reducer;
