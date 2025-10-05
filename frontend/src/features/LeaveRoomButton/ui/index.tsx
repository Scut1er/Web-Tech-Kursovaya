import ErrorParser from "@shared/services/ErrorParser";
import { useLeaveRoomMutation } from "@entities/UserRooms/api";
import { addNotification } from "@store/slices/Notifications";
import { clearRoomData } from "@store/slices/Room";
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

export interface ILeaveRoomButtonProps {
    roomPublicId: string;
    isRedirectOnLobby?: boolean;
}

const LeaveRoomButton = ({
    roomPublicId,
    isRedirectOnLobby = false,
}: ILeaveRoomButtonProps): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [leaveRoom, { isLoading }] = useLeaveRoomMutation();

    const handleLeaveRoom = async () => {
        try {
            await leaveRoom({
                public_id: roomPublicId,
            }).unwrap();

            dispatch(clearRoomData(null));

            dispatch(
                addNotification({
                    text: NotificationsMessages.ROOM_LEAVED,
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
            className="room-card-leave"
            label="Leave"
            onClick={handleLeaveRoom}
            loading={isLoading}
        />
    );
};

export default LeaveRoomButton;
