import API from "@shared/api";
import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { MouseEvent, ReactElement, useState } from "react";
import { resetSession } from "@store/slices/User";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {
    ApiEndpoints,
    NotificationsMessages,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";

const SignOutButton = (): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignOut = async (
        event: MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        event.preventDefault();

        try {
            setIsLoading(true);

            await API.apiRequest<null, undefined>(
                "post",
                ApiEndpoints.SIGN_OUT
            );

            dispatch(resetSession(null));

            dispatch(
                addNotification({
                    text: NotificationsMessages.USER_SIGNED_OUT,
                    severity: NotificationsSeverityTypes.SUCCESS,
                })
            );

            router.push(routesData.AUTHORIZATION.path);
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.ERROR,
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button label="Sign Out" onClick={handleSignOut} loading={isLoading} />
    );
};

export default SignOutButton;
