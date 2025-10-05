import React from "react";
import CopyLabel from "@shared/common/CopyLabel/ui";
import { JoinInRoomButton } from "@features/JoinInRoomButton";
import { DeleteRoomButton } from "@features/DeleteRoomButton";
import { IRoom } from "@entities/UserRooms/types";
import "./style.css";

interface IRoomCardProps {
    room: IRoom;
    userId: number;
}

export const RoomCard = ({ room, userId }: IRoomCardProps) => {
    const isUserOwner: boolean = userId === room.created_by;

    return (
        <div className="room-card">
            <div className="room-card-header">
                <h3 className="typography-card-title">{room.name}</h3>
                <CopyLabel label={room.public_id} />
            </div>

            <div className="room-card-body">
                <p className="typography-body">Created by: {room.created_by}</p>
                <p className="typography-body">
                    Created at: {new Date(room.created_at).toLocaleString()}
                </p>
            </div>

            <div className="room-card-actions">
                <JoinInRoomButton roomPublicId={room.public_id} />
                {isUserOwner && (
                    <DeleteRoomButton roomPublicId={room.public_id} />
                )}
            </div>
        </div>
    );
};

export default RoomCard;
