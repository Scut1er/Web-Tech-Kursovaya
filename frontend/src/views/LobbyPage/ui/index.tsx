"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { CreateRoom } from "@widgets/CreateRoom";
import { RoomsList } from "@widgets/RoomsList";
import { JoinRoom } from "@widgets/JoinRoom";
import { type ReactElement } from "react";
import "./style.css";

const LobbyPage = (): ReactElement => {
    return (
        <ProtectedRoute>
            <div className="lobby-page">
                <div className="lobby-header typography-heading-primary">
                    Lobby
                </div>
                <CreateRoom />
                <JoinRoom />
                <RoomsList />
            </div>
        </ProtectedRoute>
    );
};

export default LobbyPage;
