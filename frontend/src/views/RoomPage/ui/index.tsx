"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { addNotification } from "@store/slices/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RecipesList } from "@widgets/RecipesList";
import { IRoom } from "@entities/UserRooms/types";
import { RoomHeader } from "@features/RoomHeader";
import { ItemsList } from "@widgets/ItemsList";
import { roomApi } from "@entities/Room/api";
import { ReactNode, useEffect } from "react";
import { TRootState } from "@store/index";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";
import "./style.css";

const RoomPage = (): ReactNode => {
    const dispatch = useDispatch();
    const router = useRouter();

    const roomData: IRoom | null = useSelector(
        (state: TRootState) => state.room.data
    );
    const params = useParams();

    const roomId = params.id as string | undefined;

    useEffect(() => {
        return () => {
            dispatch(roomApi.util.resetApiState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!!roomId && !!roomData) {
            return;
        }

        dispatch(
            addNotification({
                text: NotificationsMessages.ROOM_NOT_LOADED,
                severity: NotificationsSeverityTypes.WARN,
            })
        );

        router.push(routesData.LOBBY.path);
    }, [roomId, roomData, dispatch, router]);

    if (!roomId || !roomData) {
        return null;
    }
    return (
        <ProtectedRoute>
            <div className="room-page">
                <RoomHeader room={roomData} />
                <div className="content">
                    <div className="items-column">
                        <ItemsList roomId={roomId} />
                    </div>
                    <div className="recipes-column">
                        <RecipesList roomId={roomId} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default RoomPage;
