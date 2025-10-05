"use client";

import useDebounce from "@shared/hooks/useDebounce";
import { SHOW_NOTIFICATION_DELAY } from "@utils/constants";
import { ReactElement, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "primereact/message";
import { TRootState } from "@store/index";
import {
    clearNotificationById,
    TNotification,
} from "@store/slices/Notifications";
import "./style.css";

const severityIcons: Record<string, string> = {
    success: "✔️",
    info: "ℹ️",
    warn: "⚠️",
    error: "❌",
};

const NotificationsList = (): ReactElement => {
    const dispatch = useDispatch();
    const notifications: TNotification[] = useSelector(
        (state: TRootState) => state.notifications.notifications
    );
    const { runDebounced } = useDebounce(SHOW_NOTIFICATION_DELAY);

    useEffect(() => {
        if (!notifications.length) return;
        const firstNotificationId = notifications[0].id;
        runDebounced(() => {
            dispatch(clearNotificationById(firstNotificationId));
        }, false);
    }, [notifications, runDebounced, dispatch]);

    return (
        <div className="notifications-list">
            {notifications.map((notification) => (
                <Message
                    key={notification.id}
                    severity={notification.severity}
                    content={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <span className="app-message-icon">
                                {severityIcons[notification.severity!]}
                            </span>
                            <span>{notification.text as ReactNode}</span>
                        </div>
                    }
                    className={`app-message-root ${notification.severity}`}
                />
            ))}
        </div>
    );
};

export default NotificationsList;
