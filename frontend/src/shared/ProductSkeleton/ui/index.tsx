import { type ReactElement } from "react";
import "./style.css";

const ProductSkeleton = (): ReactElement => {
    return (
        <div className="products-list">
            {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="product-skeleton">
                    <div className="skeleton-image" />
                    <div className="skeleton-text" />
                    <div className="skeleton-text short" />
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton;
