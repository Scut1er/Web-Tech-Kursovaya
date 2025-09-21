"use client";

import store from "@shared/store";
import type { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: PropsWithChildren): ReactElement => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
