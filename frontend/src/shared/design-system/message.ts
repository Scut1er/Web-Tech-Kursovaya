import {
    MessagePassThroughMethodOptions,
    MessagePassThroughOptions,
} from "primereact/message";

const messageDesignSystem: MessagePassThroughOptions = {
    root: ({ props }: MessagePassThroughMethodOptions) => ({
        className: `app-message-root ${props.severity}`,
    }),
    icon: {
        style: {
            display: "none",
        },
    },
};

export default messageDesignSystem;
