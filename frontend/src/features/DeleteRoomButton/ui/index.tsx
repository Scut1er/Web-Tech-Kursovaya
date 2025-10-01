import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { useDeleteRoomMutation } from "@entities/Room/api";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
} from "@utils/constants";
import "./style.css";

export interface IDeleteRoomButtonProps {
    roomPublicId: string;
}

const DeleteRoomButton = ({
    roomPublicId,
}: IDeleteRoomButtonProps): ReactElement => {
    const dispatch = useDispatch();

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
