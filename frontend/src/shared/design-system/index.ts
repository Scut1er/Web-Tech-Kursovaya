import badgeDesignSystem from "./badge";
import buttonDesignSystem from "./button";
import messageDesignSystem from "./message";
import passwordDesignSystem from "./password";
import inputTextDesignSystem from "./inputtext";
import { type PrimeReactPTOptions } from "primereact/api";

const DesignSystem: PrimeReactPTOptions = {
    inputtext: inputTextDesignSystem,
    button: buttonDesignSystem,
    password: passwordDesignSystem,
    badge: badgeDesignSystem,
    message: messageDesignSystem,
};

export default DesignSystem;
