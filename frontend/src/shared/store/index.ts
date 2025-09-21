import UserReducer from "./slices/User";
import RoomReducer from "./slices/Room";
import ApplicationReducer from "./slices/Application";
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@entities/Product/api";

const store = configureStore({
    reducer: {
        application: ApplicationReducer,
        user: UserReducer,
        room: RoomReducer,
        productApi: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(productApi.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
