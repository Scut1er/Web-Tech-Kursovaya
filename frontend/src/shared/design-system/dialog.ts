import { DialogPassThroughOptions } from "primereact/dialog";

const dialogDesignSystem: DialogPassThroughOptions = {
    root: {
        className: `app-dialog-root`,
    },
    mask: { className: "app-dialog-mask" },
    content: { className: "app-dialog-content" },
    header: { className: "app-dialog-header typography-subheading" },
    footer: { className: "app-dialog-footer" },
    closeButton: { className: "app-dialog-close-button" },
    closeButtonIcon: { className: "app-dialog-close-icon" },
};

export default dialogDesignSystem;
