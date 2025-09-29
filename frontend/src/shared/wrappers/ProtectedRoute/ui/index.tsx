import { AppDispatch, type TRootState } from "@store/index";
import { useLayoutEffect, type ReactElement } from "react";
import { setIsLoading } from "@store/slices/Application";
import { useDispatch, useSelector } from "react-redux";
import { routesData } from "@utils/constants";
import { redirect } from "next/navigation";
import {
    resetSession,
    setIsSessionLoaded,
    updateAuthSession,
} from "@store/slices/User";

export interface IProtectedRouteProps {
    children: ReactElement;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const isUserAuthorized = useSelector(
        (state: TRootState) => state.user.isUserAuthorized
    );

    const getSession = async () => {
        try {
            dispatch(setIsLoading(true));

            const authSession =
                await AuthorizationService.getCurrentAuthSession();

            dispatch(updateAuthSession(authSession));
        } catch (error: any) {
            console.error(error.message);

            dispatch(resetSession(null));

            redirect(routesData.AUTHORIZATION.path);
        } finally {
            dispatch(setIsLoading(false));
            dispatch(setIsSessionLoaded(true));
        }
    };

    useLayoutEffect(() => {
        if (!isUserAuthorized) {
            getSession();

            return;
        }
    }, []);

    if (!isUserAuthorized) {
        return <></>;
    }

    return children;
};

export default ProtectedRoute;
