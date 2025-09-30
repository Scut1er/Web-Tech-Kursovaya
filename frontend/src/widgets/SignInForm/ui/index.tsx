import {
    ApiEndpoints,
    routesData,
    signInValidationConfig,
} from "@utils/constants";
import { AuthErrorText } from "@common/AuthErrorText";
import { AppDispatch, TRootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import useFormValidation, {
    FormValidationsFieldsIds,
} from "@hooks/useFormValidation";
import {
    AnimatedComponentWrapper,
    ComponentAnimationsTypes,
} from "@shared/wrappers/AnimatedComponentWrapper";
import {
    type ChangeEvent,
    type FormEvent,
    type ReactElement,
    useEffect,
    useState,
} from "react";
import "./style.css";
import { IAuthSession } from "@entities/User/types";
import API from "@shared/api";

import { setData, updateAuthSession } from "@store/slices/User";
import ErrorParser from "@shared/services/ErrorParser";

const SignInForm = (): ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const isUserAuthorized = useSelector(
        (state: TRootState) => state.user.isUserAuthorized
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { values, handleChange } = useFormValidation(signInValidationConfig);

    const [error, setError] = useState<string>("");

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setError("");
        handleChange(event);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            const authSession: IAuthSession = await API.apiRequest(
                "post",
                ApiEndpoints.SIGN_IN,
                {
                    username: values[FormValidationsFieldsIds.USERNAME],
                    password: values[FormValidationsFieldsIds.PASSWORD],
                }
            );

            dispatch(updateAuthSession(authSession.user));

            router.push(routesData.LOBBY.path);
        } catch (error: unknown) {
            setError(ErrorParser.parseAxiosError(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isUserAuthorized) {
            return;
        }

        router.push(routesData.LOBBY.path);
    }, [router, isUserAuthorized]);

    const isEmptyField: boolean =
        !values[FormValidationsFieldsIds.USERNAME] ||
        !values[FormValidationsFieldsIds.PASSWORD];

    return (
        <div>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-form-group typography-body">
                    <InputText
                        className={`auth-form-input`}
                        name={FormValidationsFieldsIds.USERNAME}
                        onChange={handleFormChange}
                        value={values[FormValidationsFieldsIds.USERNAME]}
                        placeholder="Username"
                    />
                    <Password
                        name={FormValidationsFieldsIds.PASSWORD}
                        className={`auth-form-input`}
                        onChange={handleFormChange}
                        value={values[FormValidationsFieldsIds.PASSWORD]}
                        placeholder="Password"
                        toggleMask
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
                    label="Sign in"
                    type="submit"
                    className={`auth-form-button typography-body`}
                    disabled={isEmptyField}
                    loading={isLoading}
                />
            </form>
        </div>
    );
};

export default SignInForm;
