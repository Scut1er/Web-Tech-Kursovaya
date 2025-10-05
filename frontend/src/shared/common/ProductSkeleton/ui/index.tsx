import { CSSProperties, type ReactElement } from "react";
import "./style.css";

export interface IProductSkeletonProps {
    styles?: CSSProperties;
}

const ProductSkeleton = ({ styles }: IProductSkeletonProps): ReactElement => {
    return (
        <div className="product-skeleton" style={styles}>
            <div className="skeleton-image" />
            <div className="skeleton-text" />
            <div className="skeleton-text short" />
        </div>
    );
};

export default ProductSkeleton;
