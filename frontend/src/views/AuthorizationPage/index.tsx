"use client";

import { useState, type ReactElement } from "react";
import { SignUpForm } from "@widgets/SignUpForm";
import { SignInForm } from "@widgets/SignInForm";

export enum AuthFormType {
    login = "login",
    signUp = "signUp",
}

const AuthorizationPage = (): ReactElement => {
    const [authFormType, setAuthFormType] = useState<keyof typeof AuthFormType>(
        AuthFormType.login
    );

    const setSignUpForm = () => setAuthFormType(AuthFormType.signUp);
    const setSignInForm = () => {
        setAuthFormType(AuthFormType.login);
    };

    const authorizationFormByType = {
        login: <SignInForm />,
        signUp: <SignUpForm />,
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[linear-gradient(to_bottom_right,_#1C1C1C,_#2D2D2D)]">
            {authorizationFormByType[authFormType]}
        </div>
    );
};

export default AuthorizationPage;
