import { AuthErrorText } from "@common/AuthErrorText";
import { setIsLoading } from "@store/slices/Application";
import { AppDispatch, TRootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { redirect } from "next/navigation";
import useFormValidation, {
    FormValidationsFieldsIds,
} from "@hooks/useFormValidation";
import {
    CustomButtonPrimeClassnames,
    CustomInputPrimeClassnames,
    routesData,
    signInValidationConfig,
} from "@utils/constants";
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

const SignInForm = (): ReactElement => {
    const dispatch = useDispatch<AppDispatch>();

    const isUserAuthorized = useSelector(
        (state: TRootState) => state.user.isUserAuthorized
    );

    const { values, handleChange } = useFormValidation(signInValidationConfig);

    const [error, setError] = useState<string>("");

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setError("");
        handleChange(event);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(setIsLoading(true));

            // const authSession: IAuthSession = await AuthorizationService.signIn(
            //     {
            //         email: values[FormValidationsFieldsIds.EMAIL],
            //         password: values[FormValidationsFieldsIds.PASSWORD],
            //     }
            // );

            // dispatch(updateAuthSession(authSession));
            // await dispatch(loadUserPersonalData(authSession.token)).unwrap();
        } catch (error: any) {
            setError(error.message);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    useEffect(() => {
        if (!isUserAuthorized) {
            return;
        }

        redirect(routesData.LOBBY.path);
    }, [isUserAuthorized]);

    const isEmptyField: boolean =
        !values[FormValidationsFieldsIds.EMAIL] ||
        !values[FormValidationsFieldsIds.PASSWORD];

    return (
        <div>
            <form className="w-full bg-red" onSubmit={handleSubmit}>
                <div className="mb-[1rem] flex flex-col gap-[0.5rem]">
                    <InputText
                        className={`${CustomInputPrimeClassnames.FORM} w-full`}
                        name={FormValidationsFieldsIds.EMAIL}
                        onChange={handleFormChange}
                        value={values[FormValidationsFieldsIds.EMAIL]}
                        placeholder="Email"
                    />
                    <Password
                        name={FormValidationsFieldsIds.PASSWORD}
                        className={`${CustomInputPrimeClassnames.FORM} w-full`}
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
                    <div className="mb-[1rem]">
                        <AuthErrorText label={error} />
                    </div>
                </AnimatedComponentWrapper>
                <Button
                    label="Sign in"
                    type="submit"
                    className={`${CustomButtonPrimeClassnames.PRIMARY} w-full`}
                    disabled={isEmptyField}
                />
            </form>
        </div>
    );
};

export default SignInForm;
