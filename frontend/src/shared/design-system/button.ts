import {
    ButtonPassThroughMethodOptions,
    ButtonPassThroughOptions,
} from "primereact/button";

const buttonDesignSystem: ButtonPassThroughOptions = {
    root: ({ props }: ButtonPassThroughMethodOptions) => ({
        className: `app-button-root ${props.loading ? "loading" : ""}`,
    }),
    label: { className: "app-button-label" },
    loadingIcon: { className: "app-button-loading-icon" },
};

export default buttonDesignSystem;
