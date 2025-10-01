import {
    ButtonPassThroughMethodOptions,
    ButtonPassThroughOptions,
} from "primereact/button";

const buttonDesignSystem: ButtonPassThroughOptions = {
    root: ({ props }: ButtonPassThroughMethodOptions) => ({
        className: `app-button-root typography-body-primary ${
            props.loading ? "loading" : ""
        } ${props.disabled ? "disabled" : ""}`,
    }),
    loadingIcon: { className: "app-button-loading-icon" },
};

export default buttonDesignSystem;
