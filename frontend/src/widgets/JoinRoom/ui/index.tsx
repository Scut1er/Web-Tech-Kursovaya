import { JoinInRoomButton } from "@features/JoinInRoomButton";
import { ChangeEvent, ReactElement, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./style.css";

const JoinRoom = (): ReactElement => {
    const [joinRoomId, setJoinRoomId] = useState<string>("");

    const handleIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setJoinRoomId(event.target.value);
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
                <JoinInRoomButton
                    label="Join by public id"
                    roomPublicId={joinRoomId}
                />
            </div>
        </div>
    );
};

export default JoinRoom;
