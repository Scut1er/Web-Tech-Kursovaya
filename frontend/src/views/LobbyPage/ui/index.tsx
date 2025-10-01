"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { type ReactElement, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./style.css";
import { CreateRoom } from "@widgets/CreateRoom";

interface IRoom {
    id: string;
    name: string;
}

const LobbyPage = (): ReactElement => {
    const [rooms, setRooms] = useState<IRoom[]>([]);


    const enterRoom = (roomId: string) => {
        console.log("Entering room:", roomId);
    };

    return (
        <ProtectedRoute>
            <div className="lobby-page">
                <div className="lobby-header typography-heading">Lobby</div>

                <CreateRoom />

                <div className="lobby-my-rooms">
                    <div className="typography-subheading">My Rooms</div>
                    {rooms.length === 0 ? (
                        <div className="typography-body">
                            No rooms created yet.
                        </div>
                    ) : (
                        <div className="room-list">
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="room-item app-button-root"
                                    onClick={() => enterRoom(room.id)}
                                >
                                    <span className="typography-body">
                                        {room.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default LobbyPage;
