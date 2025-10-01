import React from "react";
import { IRoom } from "@entities/Room/types";
import { Button } from "primereact/button";
import "./style.css";

interface IRoomCardProps {
    room: IRoom;
}

export const RoomCard = ({ room }: IRoomCardProps) => {
    return (
        <div className="room-card">
            <div className="room-card-header">
                <h3 className="typography-card-title">{room.name}</h3>
                <span className="typography-card-id">#{room.public_id}</span>
            </div>

            <div className="room-card-body">
                <p className="typography-body">Created by: {room.created_by}</p>
                <p className="typography-body">
                    Created at: {new Date(room.created_at).toLocaleString()}
                </p>
            </div>

            <div className="room-card-actions">
                <Button label="Join" onClick={() => {}} />
                <Button
                    className="room-card-delete"
                    label="Delete"
                    onClick={() => {}}
                />
            </div>
        </div>
    );
};

export default RoomCard;
