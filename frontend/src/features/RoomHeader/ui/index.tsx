"use client";

import { DeleteRoomButton } from "@features/DeleteRoomButton";
import type { IRoom } from "@entities/UserRooms/types";
import { LinkButton } from "@shared/common/LinkButton";
import { routesData } from "@utils/constants";
import { ReactElement } from "react";
import "./style.css";

interface RoomHeaderProps {
    room: IRoom;
}

export const RoomHeader = ({ room }: RoomHeaderProps): ReactElement => {
    return (
        <div className="room-header">
            <div className="room-header-left">
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
            <div className="room-header-right">
                <LinkButton
                    href={routesData.LOBBY.path}
                    label="Return to Lobby"
                    className="return-button"
                    icon="pi pi-arrow-left"
                />
                <DeleteRoomButton
                    roomPublicId={room.public_id}
                    isRedirectOnLobby
                />
            </div>
        </div>
    );
};

export default RoomHeader;
