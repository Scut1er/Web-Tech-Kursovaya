"use client";

import { ProtectedRoute } from "@shared/wrappers/ProtectedRoute";
import { type ReactElement } from "react";

const RoomPage = (): ReactElement => {
    return (
        <ProtectedRoute>
            <div className="room-page">Room Page</div>;
        </ProtectedRoute>
    );
};

export default RoomPage;
