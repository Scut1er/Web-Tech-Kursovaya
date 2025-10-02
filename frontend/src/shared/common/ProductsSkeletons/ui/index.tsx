import { ProductSkeleton } from "@shared/common/ProductSkeleton";
import { CSSProperties, type ReactElement } from "react";
import "./style.css";

export interface IProductsSkeletonsProps {
    listStyles?: CSSProperties;
    skeletonStyles?: CSSProperties;
    skeletonsCount?: number;
}

const DEFAULT_SKELETONS_COUNT: number = 6;

const ProductsSkeletons = ({
    listStyles,
    skeletonStyles,
    skeletonsCount = DEFAULT_SKELETONS_COUNT,
}: IProductsSkeletonsProps): ReactElement => {
    return (
        <div className="products-skeletons-list" style={listStyles}>
            {Array.from({ length: skeletonsCount }).map((_, index: number) => (
                <ProductSkeleton key={index} styles={skeletonStyles} />
            ))}
        </div>
    );
};

export default ProductsSkeletons;
