import IdService from "@shared/services/IdService";
import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import { MessageProps } from "primereact/message";

export type TNotification = Pick<MessageProps, "text" | "severity"> & {
    id: string;
};

export interface INotificationsSlice {
    notifications: TNotification[];
}

const initialState: INotificationsSlice = {
    notifications: [],
};

const notificationsSlice: Slice<INotificationsSlice> = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (
            state,
            action: PayloadAction<Omit<TNotification, "id">>
        ) => {
            const addedNotificationId: string = IdService.getUniqueId();

            state.notifications.unshift({
                id: addedNotificationId,
                ...action.payload,
            });
        },
        clearNotifications: (state, _action: PayloadAction<null>) => {
            state.notifications = [];
        },
        clearNotificationById: (state, action: PayloadAction<string>) => {
            const filteredNotification: TNotification[] =
                state.notifications.filter(
                    (notification: TNotification) =>
                        notification.id !== action.payload
                );

            state.notifications = filteredNotification;
        },
    },
});

export const { addNotification, clearNotifications, clearNotificationById } =
    notificationsSlice.actions;

export default notificationsSlice.reducer;
