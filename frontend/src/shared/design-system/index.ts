import buttonDesignSystem from "./button";
import passwordDesignSystem from "./password";
import inputTextDesignSystem from "./inputtext";
import { type PrimeReactPTOptions } from "primereact/api";

const DesignSystem: PrimeReactPTOptions = {
    inputtext: inputTextDesignSystem,
    button: buttonDesignSystem,
    password: passwordDesignSystem,
};

export default DesignSystem;
