import { type ReactElement } from "react";
import "./style.css";

export interface IAuthErrorTextProps {
    label: string;
}

const AuthErrorText = ({ label }: IAuthErrorTextProps): ReactElement => {
    return <div className="alert-error-text typography-accent">{label}</div>;
};

export default AuthErrorText;
