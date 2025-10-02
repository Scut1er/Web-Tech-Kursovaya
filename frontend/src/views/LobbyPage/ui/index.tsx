"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { IUserPersonalData } from "@entities/User/types";
import { SignOutButton } from "@features/SignOutButton";
import { userRoomsApi } from "@entities/UserRooms/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, type ReactElement } from "react";
import { CreateRoom } from "@widgets/CreateRoom";
import { RoomsList } from "@widgets/RoomsList";
import { JoinRoom } from "@widgets/JoinRoom";
import { TRootState } from "@store/index";
import "./style.css";

const LobbyPage = (): ReactElement => {
    const dispatch = useDispatch();

    const userPersonalData: IUserPersonalData | null = useSelector(
        (state: TRootState) => state.user.personalData
    );

    useEffect(() => {
        return () => {
            dispatch(userRoomsApi.util.resetApiState());
        };
    }, [dispatch]);

    console.log("USER PERSONAL DATA: ", userPersonalData);

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
