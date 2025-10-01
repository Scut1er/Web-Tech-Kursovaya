import React from "react";
import { JoinInRoomButton } from "@features/JoinInRoomButton";
import { DeleteRoomButton } from "@features/DeleteRoomButton";
import { IRoom } from "@entities/UserRooms/types";
import "./style.css";

interface IRoomCardProps {
    room: IRoom;
}

export const RoomCard = ({ room }: IRoomCardProps) => {
    return (
        <div className="room-card">
            <div className="room-card-header">
                <h3 className="typography-card-title">{room.name}</h3>
                <span className="typography-card-id">{room.public_id}</span>
            </div>

            <div className="room-card-body">
                <p className="typography-body">Created by: {room.created_by}</p>
                <p className="typography-body">
                    Created at: {new Date(room.created_at).toLocaleString()}
                </p>
            </div>

            <div className="room-card-actions">
                <JoinInRoomButton roomPublicId={room.public_id} />
                <DeleteRoomButton roomPublicId={room.public_id} />
            </div>
        </div>
    );
};

export default RoomCard;
