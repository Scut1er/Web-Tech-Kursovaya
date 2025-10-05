import { addNotification } from "@store/slices/Notifications";
import { type ReactElement, type MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
} from "@utils/constants";
import "./style.css";

export interface ICopyLabelProps {
    label: string;
}

const LABEL_AFTER_COPY_TIMEOUT: number = 1500;

const CopyLabel = ({ label }: ICopyLabelProps): ReactElement => {
    const dispatch = useDispatch();
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyLabel = (event: MouseEvent<HTMLSpanElement>): void => {
        event.stopPropagation();

        navigator.clipboard.writeText(label);

        setCopied(true);

        dispatch(
            addNotification({
                text: NotificationsMessages.ROOM_ID_COPIED,
                severity: NotificationsSeverityTypes.SUCCESS,
            })
        );

        setTimeout(() => setCopied(false), LABEL_AFTER_COPY_TIMEOUT); // revert after 1.5s
    };

    return (
        <span
            className={`typography-card-id copy-label ${
                copied ? "copied" : ""
            }`}
            onClick={handleCopyLabel}
        >
            {copied ? "Copied!" : label}
        </span>
    );
};

export default CopyLabel;
