import ErrorParser from "@shared/services/ErrorParser";
import { ProductsSkeletons } from "@shared/common/ProductsSkeletons";
import { useLoadParticipantsQuery } from "@entities/Room/api";
import { NotificationsSeverityTypes } from "@utils/constants";
import { addNotification } from "@store/slices/Notifications";
import { ParticipantCard } from "@features/ParticipantCard";
import { TRoomParticipant } from "@entities/User/types";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";
import "./style.css";

export interface IRoomParticipantsListProps {
    currentUserId: number;
    roomId: string;
    ownerId: number;
}

const RoomParticipantsList = ({
    currentUserId,
    roomId,
    ownerId,
}: IRoomParticipantsListProps): ReactNode => {
    const dispatch = useDispatch();

    const { data, isLoading, error } = useLoadParticipantsQuery({
        public_id: roomId,
    });

    if (isLoading) {
        return (
            <ProductsSkeletons
                listStyles={{
                    flexDirection: "row",
                    maxHeight: "3rem",
                    padding: "1rem",
                }}
                skeletonStyles={{ height: "3rem" }}
            />
        );
    }

    if (error || !data) {
        dispatch(
            addNotification({
                text: ErrorParser.parseAxiosError(error),
                severity: NotificationsSeverityTypes.ERROR,
            })
        );

        return <div className="items-list-error">Error loading items</div>;
    }

    if (!data.length) {
        return <div className="items-list-empty">No participants found</div>;
    }

    return (
        <div className="room-participants-list">
            {data.map((participant: TRoomParticipant) => {
                return (
                    <ParticipantCard
                        key={participant.id}
                        id={participant.user_id}
                        name={participant.username}
                        isActive={participant.user_id === currentUserId}
                        ownerId={ownerId}
                    />
                );
            })}
        </div>
    );
};

export default RoomParticipantsList;
