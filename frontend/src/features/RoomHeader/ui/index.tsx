"use client";

import type { IRoom } from "@entities/UserRooms/types";
import { ReactElement } from "react";
import "./style.css";

interface RoomHeaderProps {
    room: IRoom;
}

export const RoomHeader = ({ room }: RoomHeaderProps): ReactElement => {
    return (
        <div className="room-header">
            <div className="typography-heading-primary">{room.name}</div>
            <div className="room-header-info">
                <span className="room-header-id typography-caption">
                    {room.public_id}
                </span>
                <span className="room-header-date typography-caption">
                    Created at: {new Date(room.created_at).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default RoomHeader;
