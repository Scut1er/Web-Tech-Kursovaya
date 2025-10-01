"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, type ReactElement } from "react";
import { RecipesList } from "@widgets/RecipesList";
import { IRoom } from "@entities/UserRooms/types";
import { RoomHeader } from "@features/RoomHeader";
import { ItemsList } from "@widgets/ItemsList";
import { roomApi } from "@entities/Room/api";
import { useParams } from "next/navigation";
import { TRootState } from "@store/index";
import "./style.css";

const RoomPage = (): ReactElement => {
    const dispatch = useDispatch();

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

    if (!roomId || !roomData) {
        return <div>Room ID not found in path</div>;
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
