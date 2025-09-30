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
}

const AuthorizationPage = (): ReactElement => {
    const [authFormType, setAuthFormType] = useState<keyof typeof AuthFormType>(
        AuthFormType.login
    );

    const setSignUpForm = () => setAuthFormType(AuthFormType.signUp);
    const setSignInForm = () => {
        setAuthFormType(AuthFormType.login);
    };

    const authorizationFormDataByType: Record<
        AuthFormType,
        IAuthorizationFormData
    > = {
        [AuthFormType.login]: {
            element: <SignInForm />,
            changeTypeButtonAction: setSignUpForm,
            changeTypeButtonLabel: "First time on the website? Go to sign up.",
        },
        [AuthFormType.signUp]: {
            element: <SignUpForm />,
            changeTypeButtonAction: setSignInForm,
            changeTypeButtonLabel: "Already have account? Go to sign in.",
        },
    };

    const {
        element: formElement,
        changeTypeButtonAction,
        changeTypeButtonLabel,
    } = authorizationFormDataByType[authFormType];

    return (
        <div className="authorization">
            <div className="content">
                {formElement}
                <Button
                    label={changeTypeButtonLabel}
                    type="submit"
                    className={`typography-body`}
                    onClick={changeTypeButtonAction}
                />
            </div>
        </div>
    );
};

export default AuthorizationPage;
