import { type ReactElement } from "react";
import "./style.css";

const ProductSkeleton = (): ReactElement => {
    return (
        <div className="product-skeleton">
            <div className="skeleton-image" />
            <div className="skeleton-text" />
            <div className="skeleton-text short" />
        </div>
    );
};

export default ProductSkeleton;
