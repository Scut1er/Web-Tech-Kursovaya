import classNames from "classnames";
import {
    CustomButtonPrimeClassnames,
    CustomButtonPrimeSeverityTypes,
} from "@utils/constants";
import {
    ButtonPassThroughMethodOptions,
    ButtonPassThroughOptions,
} from "primereact/button";

const buttonDesignSystem: ButtonPassThroughOptions = {
    root: { className: "my-button" },
    label: { className: "my-button-label" },
};

export default buttonDesignSystem;
