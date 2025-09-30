import type { ReactElement } from "react";
import "./style.css";

const PageLoader = (): ReactElement => {
    return (
        <div className="page-loader-wrapper">
            <div className="loader">
                <h1>LOADING</h1>
                <div className="line-wrapper">
                    <div className="loading-line"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
