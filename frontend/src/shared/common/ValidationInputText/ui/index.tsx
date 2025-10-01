import { InputText, type InputTextProps } from "primereact/inputtext";
import { AuthErrorText } from "@shared/common/AuthErrorText";
import { type ReactElement } from "react";
import {
    AnimatedComponentWrapper,
    ComponentAnimationsTypes,
} from "@shared/wrappers/AnimatedComponentWrapper";
import "./style.css";

export interface IValidationInputTextUniqueProps {
    validationMessage: string;
}

export type TValidationInputTextProps = IValidationInputTextUniqueProps &
    InputTextProps;

const ValidationInputText = ({
    validationMessage,
    ...rest
}: TValidationInputTextProps): ReactElement => {
    return (
        <div className="validation-input">
            <div>
                <InputText
                    type={rest.type}
                    className={rest.className}
                    name={rest.name}
                    onChange={rest.onChange}
                    value={rest.value}
                    placeholder={rest.placeholder}
                    invalid={rest.invalid}
                />
            </div>
            <AnimatedComponentWrapper
                isVisible={!!rest.invalid}
                animationType={ComponentAnimationsTypes.FADE_EXPAND}
            >
                <AuthErrorText label={validationMessage} />
            </AnimatedComponentWrapper>
        </div>
    );
};

export default ValidationInputText;
