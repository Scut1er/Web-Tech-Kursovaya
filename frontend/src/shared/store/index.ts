import UserReducer from "./slices/User";
import RoomReducer from "./slices/Room";
import ApplicationReducer from "./slices/Application";
import NotificationsReducer from "./slices/Notifications";
import { configureStore } from "@reduxjs/toolkit";
import { userRoomsApi } from "@entities/Room/api";

const store = configureStore({
    reducer: {
        application: ApplicationReducer,
        user: UserReducer,
        room: RoomReducer,
        notifications: NotificationsReducer,
        userRoomsApi: userRoomsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(userRoomsApi.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
