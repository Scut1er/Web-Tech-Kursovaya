"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { SignOutButton } from "@features/SignOutButton";
import { userRoomsApi } from "@entities/UserRooms/api";
import { useEffect, type ReactElement } from "react";
import { CreateRoom } from "@widgets/CreateRoom";
import { RoomsList } from "@widgets/RoomsList";
import { JoinRoom } from "@widgets/JoinRoom";
import { useDispatch } from "react-redux";
import "./style.css";

const LobbyPage = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(userRoomsApi.util.resetApiState());
        };
    }, [dispatch]);

    return (
        <ProtectedRoute>
            <div className="lobby-page">
                <div className="lobby-header">
                    <div className="typography-heading-primary">Lobby</div>
                    <SignOutButton />
                </div>
                <CreateRoom />
                <JoinRoom />
                <RoomsList />
            </div>
        </ProtectedRoute>
    );
};

export default LobbyPage;
