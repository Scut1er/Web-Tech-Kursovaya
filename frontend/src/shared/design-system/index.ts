import badgeDesignSystem from "./badge";
import dialogDesignSystem from "./dialog";
import buttonDesignSystem from "./button";
import messageDesignSystem from "./message";
import passwordDesignSystem from "./password";
import inputTextDesignSystem from "./inputtext";
import inputSwitchDesignSystem from "./inputswitch";
import { type PrimeReactPTOptions } from "primereact/api";

const DesignSystem: PrimeReactPTOptions = {
    inputtext: inputTextDesignSystem,
    button: buttonDesignSystem,
    password: passwordDesignSystem,
    badge: badgeDesignSystem,
    message: messageDesignSystem,
    inputswitch: inputSwitchDesignSystem,
    dialog: dialogDesignSystem,
};

export default DesignSystem;
