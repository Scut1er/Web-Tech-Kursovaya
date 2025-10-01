import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { useCreateRoomMutation } from "@entities/Room/api";
import { InputText } from "primereact/inputtext";
import { ReactElement, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {
    isValidRoomName,
    NotificationsMessages,
    NotificationsSeverityTypes,
} from "@utils/constants";

const CreateRoom = (): ReactElement => {
    const dispatch = useDispatch();

    const [createRoom, { isLoading }] = useCreateRoomMutation();

    const [newRoomName, setNewRoomName] = useState<string>("");

    const handleCreateRoom = async () => {
        try {
            await createRoom({
                name: newRoomName,
            }).unwrap();

            dispatch(
                addNotification({
                    text: NotificationsMessages.ROOM_CREATED,
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

    const isValid: boolean = isValidRoomName(newRoomName);

    return (
        <div className="lobby-create-room">
            <div className="typography-subheading">Create a Family Room</div>
            <div className="lobby-create-room-controls">
                <InputText
                    placeholder="Room name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
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
