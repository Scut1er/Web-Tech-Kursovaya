import { type ReactElement } from "react";

export interface IAuthErrorTextProps {
    label: string;
}

const AuthErrorText = ({ label }: IAuthErrorTextProps): ReactElement => {
    return (
        <div className="w-full caption-text text-ui-alert-text text-left break-words">
            {label}
        </div>
    );
};

export default AuthErrorText;
