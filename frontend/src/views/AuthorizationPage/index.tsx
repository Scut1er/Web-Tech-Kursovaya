"use client";

import { useState, type ReactElement } from "react";
import { SignUpForm } from "@widgets/SignUpForm";
import { SignInForm } from "@widgets/SignInForm";
import { Button } from "primereact/button";
import "./style.css";

export enum AuthFormType {
    login = "login",
    signUp = "signUp",
}

interface IAuthorizationFormData {
    element: ReactElement;
    changeTypeButtonAction: () => void;
    changeTypeButtonLabel: string;
    infoText?: string;
}

const AuthorizationPage = (): ReactElement => {
    const [authFormType, setAuthFormType] = useState<keyof typeof AuthFormType>(
        AuthFormType.login
    );

    const setSignUpForm = () => setAuthFormType(AuthFormType.signUp);
    const setSignInForm = () => setAuthFormType(AuthFormType.login);

    const authorizationFormDataByType: Record<
        AuthFormType,
        IAuthorizationFormData
    > = {
        [AuthFormType.login]: {
            element: <SignInForm />,
            changeTypeButtonAction: setSignUpForm,
            changeTypeButtonLabel: "First time on the website? Sign up now.",
            infoText: "Welcome back! Please login to access your dashboard.",
        },
        [AuthFormType.signUp]: {
            element: <SignUpForm />,
            changeTypeButtonAction: setSignInForm,
            changeTypeButtonLabel: "Already have an account? Sign in.",
            infoText:
                "Join our community! Register now and start your journey.",
        },
    };

    const {
        element: formElement,
        changeTypeButtonAction,
        changeTypeButtonLabel,
        infoText,
    } = authorizationFormDataByType[authFormType];

    const subheadingLabel: string =
        authFormType === "login" ? "Sign In" : "Sign Up";

    return (
        <div className="authorization">
            <div className="decorative-circle top-left"></div>
            <div className="decorative-circle bottom-right"></div>
            <div className="content">
                <h2 className="typography-subheading">{subheadingLabel}</h2>
                <p className="typography-caption info-text">{infoText}</p>
                {formElement}
                <Button
                    label={changeTypeButtonLabel}
                    type="button"
                    className="typography-body switch-form-button"
                    onClick={changeTypeButtonAction}
                />
            </div>
        </div>
    );
};

export default AuthorizationPage;
