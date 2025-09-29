import { Password, type PasswordProps } from "primereact/password";
import { AuthErrorText } from "@shared/common/AuthErrorText";
import { type ReactElement } from "react";
import {
    AnimatedComponentWrapper,
    ComponentAnimationsTypes,
} from "@shared/wrappers/AnimatedComponentWrapper";

export interface IValidationPasswordUniqueProps {
    validationMessage: string;
}

export type TValidationPasswordProps = IValidationPasswordUniqueProps &
    PasswordProps;

const ValidationPassword = ({
    validationMessage,
    ...rest
}: TValidationPasswordProps): ReactElement => {
    return (
        <div>
            <div className={rest.invalid ? "mb-[1rem]" : ""}>
                <Password
                    className={rest.className}
                    name={rest.name}
                    onChange={rest.onChange}
                    value={rest.value}
                    placeholder={rest.placeholder}
                    invalid={rest.invalid}
                    toggleMask={rest.toggleMask}
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

export default ValidationPassword;
