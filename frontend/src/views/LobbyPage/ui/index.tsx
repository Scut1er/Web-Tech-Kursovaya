"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { CreateRoom } from "@widgets/CreateRoom";
import { RoomsList } from "@widgets/RoomsList";
import { type ReactElement } from "react";
import "./style.css";

const LobbyPage = (): ReactElement => {
    return (
        <ProtectedRoute>
            <div className="lobby-page">
                <div className="lobby-header typography-heading">Lobby</div>
                <CreateRoom />
                <RoomsList />
            </div>
        </ProtectedRoute>
    );
};

export default LobbyPage;
