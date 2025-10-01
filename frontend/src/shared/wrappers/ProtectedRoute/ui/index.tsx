"use client";

import API from "@shared/api";
import ErrorParser from "@shared/services/ErrorParser";
import { resetSession, setIsUserAuthorized } from "@store/slices/User";
import { addNotification } from "@store/slices/Notifications";
import { AppDispatch, type TRootState } from "@store/index";
import { PropsWithChildren, useLayoutEffect } from "react";
import { setIsLoading } from "@store/slices/Application";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
    ApiEndpoints,
    NotificationsSeverityTypes,
    routesData,
} from "@utils/constants";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const isUserAuthorized = useSelector(
        (state: TRootState) => state.user.isUserAuthorized
    );

    const getSession = async () => {
        try {
            dispatch(setIsLoading(true));

            await API.apiRequest("get", ApiEndpoints.ROOMS_MY);

            dispatch(setIsUserAuthorized(true));
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.WARN,
                })
            );

            dispatch(resetSession(null));

            router.push(routesData.AUTHORIZATION.path);
        } finally {
            dispatch(setIsLoading(false));
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
