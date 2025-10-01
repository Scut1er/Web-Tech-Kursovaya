"use client";

import API from "@shared/api";
import ErrorParser from "@shared/services/ErrorParser";
import { AppDispatch, type TRootState } from "@store/index";
import { PropsWithChildren, useLayoutEffect } from "react";
import { setIsLoading } from "@store/slices/Application";
import { useDispatch, useSelector } from "react-redux";
import { ApiEndpoints, routesData } from "@utils/constants";
import { resetSession, setIsUserAuthorized } from "@store/slices/User";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const isUserAuthorized = useSelector(
        (state: TRootState) => state.user.isUserAuthorized
    );

    const getSession = async () => {
        try {
            dispatch(setIsLoading(true));

            await API.apiRequest("post", ApiEndpoints.ROOMS_MY);

            dispatch(setIsUserAuthorized(true));

            router.push(routesData.AUTHORIZATION.path);
        } catch (error: unknown) {
            console.error(ErrorParser.parseAxiosError(error));

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
