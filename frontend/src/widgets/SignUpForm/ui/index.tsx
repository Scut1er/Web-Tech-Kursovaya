import { ChangeEvent, FormEvent, useState, type ReactElement } from "react";
import { ValidationInputText } from "@common/ValidationInputText";
import { ValidationPassword } from "@common/ValidationPassword";
import { AuthErrorText } from "@common/AuthErrorText";
import { setIsLoading } from "@store/slices/Application";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {
    CustomButtonPrimeClassnames,
    CustomInputPrimeClassnames,
    signUpValidationConfig,
    ValidationErrors,
} from "@utils/constants";
import {
    AnimatedComponentWrapper,
    ComponentAnimationsTypes,
} from "@shared/wrappers/AnimatedComponentWrapper";
import useFormValidation, {
    FormValidationsFieldsIds,
} from "@hooks/useFormValidation";

const SignUpForm = (): ReactElement => {
    const dispatch = useDispatch();

    const { values, visibleErrors, handleChange, isValid } = useFormValidation(
        signUpValidationConfig
    );

    const [error, setError] = useState<string>("");

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setError("");
        handleChange(event);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(setIsLoading(true));

            // await AuthorizationService.signUp({
            //     email: values[FormValidationsFieldsIds.EMAIL],
            //     password: values[FormValidationsFieldsIds.PASSWORD],
            // });

            // dispatch(
            //     updateCredentials({
            //         email: values[FormValidationsFieldsIds.EMAIL],
            //         password: values[FormValidationsFieldsIds.PASSWORD],
            //     })
            // );
        } catch (error: any) {
            setError(error.message);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return (
        <div className="sign-up-form">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-[1rem] flex flex-col gap-[0.5rem]">
                    <ValidationInputText
                        type="email"
                        name={FormValidationsFieldsIds.EMAIL}
                        className={`${CustomInputPrimeClassnames.FORM} w-full`}
                        onChange={handleFormChange}
                        value={values[FormValidationsFieldsIds.EMAIL]}
                        placeholder="Email"
                        invalid={visibleErrors[FormValidationsFieldsIds.EMAIL]}
                        validationMessage={ValidationErrors.EMAIL}
                    />
                    <ValidationPassword
                        name={FormValidationsFieldsIds.PASSWORD}
                        onChange={handleFormChange}
                        className={`${CustomInputPrimeClassnames.FORM} w-full`}
                        value={values[FormValidationsFieldsIds.PASSWORD]}
                        placeholder="Password"
                        invalid={
                            visibleErrors[FormValidationsFieldsIds.PASSWORD]
                        }
                        toggleMask
                        validationMessage={ValidationErrors.PASSWORD}
                    />
                </div>
                <AnimatedComponentWrapper
                    isVisible={!!error}
                    animationType={ComponentAnimationsTypes.FADE_EXPAND}
                >
                    <div className="mb-[1rem]">
                        <AuthErrorText label={error} />
                    </div>
                </AnimatedComponentWrapper>
                <Button
                    type="submit"
                    className={`${CustomButtonPrimeClassnames.PRIMARY} w-full`}
                    label="Sign Up"
                    disabled={!isValid}
                />
            </form>
        </div>
    );
};

export default SignUpForm;
