import classNames from "classnames";
import { CustomInputPrimeClassnames } from "@utils/constants";
import {
    type InputTextPassThroughMethodOptions,
    type InputTextPassThroughOptions,
} from "primereact/inputtext";

const inputTextDesignSystem: InputTextPassThroughOptions = {
    root: ({ props, context }: InputTextPassThroughMethodOptions) => {
        const customClassName: string = props.className || "";

        const customStyles = {
            [CustomInputPrimeClassnames.FORM]:
                " rounded-[2.125rem] py-[0.625rem] px-[1rem] hover:bg-ui-fg-very-light focus:bg-ui-fg-very-light",
            [CustomInputPrimeClassnames.SECONDARY]:
                "bg-ui-bg px-[1.125rem] py-[0.625rem] rounded-[2.125rem] hover:bg-ui-fg-very-light focus:bg-ui-fg-very-light",
            [CustomInputPrimeClassnames.DEFAULT]: "bg-transparent w-full",
        };

        const matchedKey = Object.keys(customStyles).find((key) =>
            customClassName.includes(key)
        );

        return {
            className: classNames(
                "body-text text-ui-white-bg overflow-hidden outline-none relative select-text text-left",
                "transition duration-200 ease-in-out",
                "focus:outline-none focus-visible:outline-none",
                {
                    "cursor-not-allowed opacity-60 pointer-events-none":
                        context.disabled,
                },
                {
                    "border border-red-400": props.invalid,
                },
                matchedKey &&
                    customStyles[matchedKey as keyof typeof customStyles]
            ),
        };
    },
};

export default inputTextDesignSystem;
