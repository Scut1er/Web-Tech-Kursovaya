import API from "@shared/api";
import { ChangeEvent, FormEvent, type ReactElement, useState } from "react";
import { ValidationInputText } from "@shared/common/ValidationInputText";
import { ValidationPassword } from "@shared/common/ValidationPassword";
import { setIsLoading } from "@store/slices/Application";
import { AuthErrorText } from "@common/AuthErrorText";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { IAuthSession } from "@entities/User/types";
import { setData, updateAuthSession } from "@store/slices/User";
import { useRouter } from "next/navigation";
import useFormValidation, {
    FormValidationsFieldsIds,
} from "@hooks/useFormValidation";
import {
    ApiEndpoints,
    routesData,
    signUpValidationConfig,
    ValidationErrors,
} from "@utils/constants";
import {
    AnimatedComponentWrapper,
    ComponentAnimationsTypes,
} from "@shared/wrappers/AnimatedComponentWrapper";
import ErrorParser, {
    SpecialErrorMessages,
} from "@shared/services/ErrorParser";
import "./style.css";

const SignUpForm = (): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { values, handleChange, isValid, errors } = useFormValidation(
        signUpValidationConfig
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError("");
        handleChange(event);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);

            const authSession: IAuthSession = await API.apiRequest(
                "post",
                ApiEndpoints.REGISTRATION,
                {
                    username: values[FormValidationsFieldsIds.USERNAME],
                    password: values[FormValidationsFieldsIds.PASSWORD],
                }
            );

            dispatch(updateAuthSession(authSession.user));

            router.push(routesData.LOBBY.path);
        } catch (error: unknown) {
            const errorMessage: string = ErrorParser.parseAxiosError(error);

            if (errorMessage === SpecialErrorMessages.USER_ALREADY_EXIST) {
                router.push(routesData.LOBBY.path);

                return;
            }

            setError(ErrorParser.parseAxiosError(error));
        } finally {
            setIsLoading(false);
        }
    };

    const isEmptyField =
        !values[FormValidationsFieldsIds.USERNAME] ||
        !values[FormValidationsFieldsIds.PASSWORD];

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit}>
                <div className="auth-form-group typography-body">
                    <ValidationInputText
                        className="auth-form-input"
                        name={FormValidationsFieldsIds.USERNAME}
                        value={values[FormValidationsFieldsIds.USERNAME]}
                        placeholder="Username"
                        onChange={handleFormChange}
                        invalid={errors[FormValidationsFieldsIds.USERNAME]}
                        validationMessage={ValidationErrors.USERNAME}
                    />
                    <ValidationPassword
                        className="auth-form-input"
                        name={FormValidationsFieldsIds.PASSWORD}
                        value={values[FormValidationsFieldsIds.PASSWORD]}
                        placeholder="Password"
                        onChange={handleFormChange}
                        invalid={errors[FormValidationsFieldsIds.PASSWORD]}
                        toggleMask
                        validationMessage={ValidationErrors.PASSWORD}
                    />
                </div>
                <AnimatedComponentWrapper
                    isVisible={!!error}
                    animationType={ComponentAnimationsTypes.FADE_EXPAND}
                >
                    <div className="auth-form-error typography-accent">
                        <AuthErrorText label={error} />
                    </div>
                </AnimatedComponentWrapper>
                <Button
                    type="submit"
                    label="Sign Up"
                    className="auth-form-button typography-body"
                    disabled={isEmptyField || !isValid}
                    loading={isLoading}
                />
            </form>
        </div>
    );
};

export default SignUpForm;
