"use client";

import API from "@shared/api";
import ErrorParser from "@shared/services/ErrorParser";
import { PropsWithChildren, useCallback, useLayoutEffect } from "react";
import { resetSession, updateAuthSession } from "@store/slices/User";
import { addNotification } from "@store/slices/Notifications";
import { AppDispatch, type TRootState } from "@store/index";
import { IUserPersonalData } from "@entities/User/types";
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

    const getSession = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));

            const userPersonalData: IUserPersonalData = await API.apiRequest<
                IUserPersonalData,
                undefined
            >("get", ApiEndpoints.FETCH_SESSION);

            dispatch(updateAuthSession(userPersonalData));
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
    }, [dispatch, router]);

    useLayoutEffect(() => {
        if (!isUserAuthorized) {
            getSession();

            return;
        }
    }, [isUserAuthorized, getSession]);

    if (!isUserAuthorized) {
        return <></>;
    }

    return children;
};

export default ProtectedRoute;
