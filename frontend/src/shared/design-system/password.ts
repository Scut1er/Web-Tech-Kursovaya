import { type PasswordPassThroughOptions } from "primereact/password";

const passwordDesignSystem: PasswordPassThroughOptions = {
    root: {
        className: "app-password-root",
    },
    panel: {
        className: "app-password-hidden",
    },
    meter: {
        className: "app-password-hidden",
    },
    info: {
        className: "app-password-hidden",
    },
};

export default passwordDesignSystem;
