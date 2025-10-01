import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { useJoinRoomMutation } from "@entities/UserRooms/api";
import { ChangeEvent, ReactElement, useState } from "react";
import { IRoom } from "@entities/UserRooms/types";
import { InputText } from "primereact/inputtext";
import { setRoomData } from "@store/slices/Room";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";
import "./style.css";

const JoinRoom = (): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [joinRoom, { isLoading }] = useJoinRoomMutation();

    const [joinRoomId, setJoinRoomId] = useState<string>("");

    const handleIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setJoinRoomId(event.target.value);
    };

    const handleJoinRoom = async () => {
        try {
            const joinedRoom: IRoom = await joinRoom({
                public_id: joinRoomId,
            }).unwrap();

            dispatch(setRoomData(joinedRoom));

            dispatch(
                addNotification({
                    text: NotificationsMessages.ROOM_JOINED,
                    severity: NotificationsSeverityTypes.SUCCESS,
                })
            );

            router.push(`${routesData.ROOM.path}/${joinRoomId}`);
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
        <div className="lobby-join-room">
            <div className="typography-subheading">
                Join in Family Room by public id
            </div>
            <div className="lobby-join-room-controls">
                <InputText
                    placeholder="Room id"
                    value={joinRoomId}
                    onChange={handleIdChange}
                    className="app-input-root"
                />
                <Button
                    label="Join by public id"
                    onClick={handleJoinRoom}
                    loading={isLoading}
                />
            </div>
        </div>
    );
};

export default JoinRoom;
