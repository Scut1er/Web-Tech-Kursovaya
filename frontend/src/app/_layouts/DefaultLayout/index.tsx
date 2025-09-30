"use client";

import { FullScreenLoader } from "@shared/common/FullScreenLoader";
import { PropsWithChildren, ReactElement } from "react";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";

const DefaultLayout = ({ children }: PropsWithChildren): ReactElement => {
    const isLoading = useSelector(
        (state: TRootState) => state.application.isLoading
    );

    return (
        <div className="default-layout">
            {children}
            {isLoading && <FullScreenLoader />}
        </div>
    );
};

export default DefaultLayout;
