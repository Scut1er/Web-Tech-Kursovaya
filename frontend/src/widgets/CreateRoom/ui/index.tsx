import { useCreateRoomMutation } from "@entities/Room/api";
import ErrorParser from "@shared/services/ErrorParser";
import { setIsLoading } from "@store/slices/Application";
import { InputText } from "primereact/inputtext";
import { ReactElement, useState } from "react";
import { Button } from "primereact/button";

const CreateRoom = (): ReactElement => {
    const [newRoomName, setNewRoomName] = useState<string>("");

    const [createRoom, { isLoading }] = useCreateRoomMutation();

    const handleCreateRoom = async () => {
        const room = await createRoom({ name: newRoomName }).unwrap();

        console.log("Created room:", room);
    };

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
                    className="app-button-root"
                    onClick={handleCreateRoom}
                    loading={isLoading}
                />
            </div>
        </div>
    );
};

export default CreateRoom;
