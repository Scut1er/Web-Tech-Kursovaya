import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { useJoinRoomMutation } from "@entities/UserRooms/api";
import { IRoom } from "@entities/UserRooms/types";
import { setRoomData } from "@store/slices/Room";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";

export interface IJoinInRoomButtonProps {
    label?: string;
    roomPublicId: string;
}

const DEFAULT_LABEL: string = "Join";

const JoinInRoomButton = ({
    roomPublicId,
    label = DEFAULT_LABEL,
}: IJoinInRoomButtonProps): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [joinRoom, { isLoading, isSuccess }] = useJoinRoomMutation();

    const handleJoinInRoom = async () => {
        try {
            const roomData: IRoom = await joinRoom({
                public_id: roomPublicId,
            }).unwrap();

            dispatch(setRoomData(roomData));

            dispatch(
                addNotification({
                    text: NotificationsMessages.ROOM_JOINED,
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

    useEffect(() => {
        if (!isSuccess) {
            return;
        }

        router.push(`${routesData.ROOM.path}/${roomPublicId}`);
    }, [roomPublicId, isSuccess, router]);

    return (
        <Button label={label} onClick={handleJoinInRoom} loading={isLoading} />
    );
};

export default JoinInRoomButton;
