"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { type ReactElement } from "react";

const LobbyPage = (): ReactElement => {
    return (
        <ProtectedRoute>
            <div className="lobby-page">Lobby Page</div>;
        </ProtectedRoute>
    );
};

export default LobbyPage;
