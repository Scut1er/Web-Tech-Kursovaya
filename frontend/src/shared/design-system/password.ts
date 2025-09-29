import classNames from "classnames";
import { CustomInputPrimeClassnames } from "@utils/constants";
import {
    type PasswordPassThroughOptions,
    type PasswordPassThroughMethodOptions,
} from "primereact/password";

const passwordDesignSystem: PasswordPassThroughOptions = {
    root: {
        className: "relative",
    },
    input: ({ props }: PasswordPassThroughMethodOptions) => {
        const customClassName: string = props.className || "";

        const customStyles = {
            [CustomInputPrimeClassnames.FORM]:
                "body-text bg-ui-fg-light w-full rounded-[2.125rem] py-[0.625rem] px-[1rem] focus:bg-ui-fg-very-light",
            [CustomInputPrimeClassnames.DEFAULT]: "bg-transparent w-full",
        };

        const matchedKey = Object.keys(customStyles).find((key) =>
            customClassName.includes(key)
        );

        return {
            className: classNames(
                matchedKey &&
                    customStyles[matchedKey as keyof typeof customStyles]
            ),
        };
    },
    meter: {
        className: "hidden",
    },
    meterLabel: {
        className: "hidden",
    },
    info: {
        className: "hidden",
    },
    iconField: {
        className: "cursor-pointer",
    },
    showIcon: {
        className:
            "w-[1.25rem] h-[1.25rem] absolute top-[50%] transform -translate-y-1/2 right-[1rem] transition duration-ui-kit-transition-duration focus:scale-[1.4] focus:outline-none hover:cursor-pointer",
    },
    hideIcon: {
        className:
            "w-[1.25rem] h-[1.25rem] absolute top-[50%] transform -translate-y-1/2 right-[1rem] transition duration-ui-kit-transition-duration focus:scale-[1.4] focus:outline-none hover:cursor-pointer",
    },
};

export default passwordDesignSystem;
