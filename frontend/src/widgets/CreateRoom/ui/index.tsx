import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { useCreateRoomMutation } from "@entities/UserRooms/api";
import { ChangeEvent, ReactElement, useState } from "react";
import { IRoom } from "@entities/UserRooms/types";
import { setRoomData } from "@store/slices/Room";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {
    isValidRoomName,
    NotificationsMessages,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";
import "./style.css";

const CreateRoom = (): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [createRoom, { isLoading }] = useCreateRoomMutation();

    const [newRoomName, setNewRoomName] = useState<string>("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNewRoomName(event.target.value);
    };

    const handleCreateRoom = async () => {
        try {
            const createdRoom: IRoom = await createRoom({
                name: newRoomName,
            }).unwrap();

            dispatch(setRoomData(createdRoom));

            dispatch(
                addNotification({
                    text: NotificationsMessages.ROOM_CREATED,
                    severity: NotificationsSeverityTypes.SUCCESS,
                })
            );

            router.push(`${routesData.ROOM.path}/${createdRoom.public_id}`);
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.ERROR,
                })
            );
        }
    };

    const isValid: boolean = isValidRoomName(newRoomName);

    return (
        <div className="lobby-create-room">
            <div className="typography-subheading">Create a Family Room</div>
            <div className="lobby-create-room-controls">
                <InputText
                    placeholder="Room name"
                    value={newRoomName}
                    onChange={handleNameChange}
                    className="app-input-root"
                />
                <Button
                    label="Create"
                    onClick={handleCreateRoom}
                    loading={isLoading}
                    disabled={!isValid}
                />
            </div>
        </div>
    );
};

export default CreateRoom;
