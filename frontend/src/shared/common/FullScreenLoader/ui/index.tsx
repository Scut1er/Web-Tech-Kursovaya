import type { ReactElement } from "react";
import "./style.css";

const FullScreenLoader = (): ReactElement => {
    return (
        <div className="full-screen-loader-wrapper">
            <div className="full-screen-loader">
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
