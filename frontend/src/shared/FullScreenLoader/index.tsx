import type { ReactElement } from "react";
import "./style.css";

const FullScreenLoader = (): ReactElement => {
    return (
        <div className="full-screen-loader-wrapper">
            <div className="loader">
                <h1>LOADING</h1>
                <div className="line-wrapper">
                    <div className="loading-line"></div>
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
