"use client";

import LeaveRoomButton from "@features/LeaveRoomButton/ui";
import { RoomParticipantsList } from "@widgets/RoomParticipantsList";
import { DeleteRoomButton } from "@features/DeleteRoomButton";
import { IUserPersonalData } from "@entities/User/types";
import type { IRoom } from "@entities/UserRooms/types";
import { LinkButton } from "@shared/common/LinkButton";
import { ReactElement, ReactNode } from "react";
import { routesData } from "@utils/constants";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import "./style.css";

interface RoomHeaderProps {
    room: IRoom;
}

const RoomHeader = ({ room }: RoomHeaderProps): ReactNode => {
    const userPersonalData: IUserPersonalData | null = useSelector(
        (state: TRootState) => state.user.personalData
    );

    if (!userPersonalData) {
        return null;
    }

    const isRoomOwner: boolean = userPersonalData.id === room.created_by;
    const currentUserRoleAction: ReactElement = !isRoomOwner ? (
        <LeaveRoomButton roomPublicId={room.public_id} isRedirectOnLobby />
    ) : (
        <DeleteRoomButton roomPublicId={room.public_id} isRedirectOnLobby />
    );

    return (
        <div className="room-header">
            <div className="room-header-left">
                <div className="room-header-title">
                    <div className="typography-heading-primary-not-center">
                        {room.name}
                    </div>
                </div>
                <div className="room-header-info">
                    <span className="room-header-id typography-caption">
                        {room.public_id}
                    </span>
                    <span className="room-header-date typography-caption">
                        Created at: {new Date(room.created_at).toLocaleString()}
                    </span>
                </div>
                <div className="room-participants-header typography-subheading">
                    Participants
                </div>
                <RoomParticipantsList
                    currentUserId={userPersonalData.id}
                    roomId={room.public_id}
                    ownerId={room.created_by}
                />
            </div>
            <div className="room-header-right">
                <LinkButton
                    href={routesData.LOBBY.path}
                    label="Return to Lobby"
                    className="return-button"
                    icon="pi pi-arrow-left"
                />
                {currentUserRoleAction}
            </div>
        </div>
    );
};

export default RoomHeader;
