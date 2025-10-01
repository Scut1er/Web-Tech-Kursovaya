"use client";

import DesignSystem from "@shared/design-system";
import type { PropsWithChildren, ReactElement } from "react";
import { PrimeReactProvider } from "primereact/api";

const DesignSystemProvider = ({
    children,
}: PropsWithChildren): ReactElement => {
    return (
        <PrimeReactProvider
            value={{
                unstyled: true,
                pt: DesignSystem,
                ptOptions: {
                    mergeSections: true,
                    mergeProps: true,
                },
            }}
        >
            {children}
        </PrimeReactProvider>
    );
};

export default DesignSystemProvider;
