"use client";

import useDebounce from "@shared/hooks/useDebounce";
import { SHOW_NOTIFICATION_DELAY } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, useEffect } from "react";
import { Message } from "primereact/message";
import { TRootState } from "@store/index";
import {
    clearNotificationById,
    TNotification,
} from "@store/slices/Notifications";
import "./style.css";

const NotificationsList = (): ReactElement => {
    const dispatch = useDispatch();

    const notifications: TNotification[] = useSelector(
        (state: TRootState) => state.notifications.notifications
    );

    const { runDebounced } = useDebounce(SHOW_NOTIFICATION_DELAY);

    useEffect(() => {
        if (!notifications.length) {
            return;
        }

        const firstNotificationId: string = notifications[0].id;

        runDebounced(() => {
            dispatch(clearNotificationById(firstNotificationId));
        }, false);
    }, [notifications, runDebounced, dispatch]);

    return (
        <div className={`notifications-list typography-body`}>
            {notifications.map((notification: TNotification) => (
                <Message
                    key={notification.id}
                    severity={notification.severity}
                    text={notification.text}
                />
            ))}
        </div>
    );
};

export default NotificationsList;
