"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { IRoom } from "@entities/UserRooms/types";
import { RoomHeader } from "@features/RoomHeader";
import { ItemsList } from "@widgets/ItemsList";
import { useParams } from "next/navigation";
import { TRootState } from "@store/index";
import { type ReactElement } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const RoomPage = (): ReactElement => {
    const roomData: IRoom | null = useSelector(
        (state: TRootState) => state.room.data
    );
    const params = useParams();

    const roomId = params.id as string | undefined;

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
                    <div className="recipes-column"></div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default RoomPage;
