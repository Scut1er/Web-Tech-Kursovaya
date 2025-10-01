import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { useDeleteRoomMutation } from "@entities/UserRooms/api";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";
import "./style.css";

export interface IDeleteRoomButtonProps {
    roomPublicId: string;
    isRedirectOnLobby?: boolean;
}

const DeleteRoomButton = ({
    roomPublicId,
    isRedirectOnLobby = false,
}: IDeleteRoomButtonProps): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [deleteRoom, { isLoading }] = useDeleteRoomMutation();

    const handleDeleteRoom = async () => {
        try {
            await deleteRoom({
                public_id: roomPublicId,
            }).unwrap();

            dispatch(
                addNotification({
                    text: NotificationsMessages.ROOM_DELETED,
                    severity: NotificationsSeverityTypes.SUCCESS,
                })
            );

            if (!isRedirectOnLobby) {
                return;
            }

            router.push(routesData.LOBBY.path);
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.ERROR,
                })
            );
        }
    };

    return (
        <Button
            className="room-card-delete"
            label="Delete"
            onClick={handleDeleteRoom}
            loading={isLoading}
        />
    );
};

export default DeleteRoomButton;
