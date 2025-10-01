import { ProductSkeleton } from "@shared/common/ProductSkeleton";
import { type ReactElement } from "react";
import "./style.css";

const ProductsSkeletons = (): ReactElement => {
    return (
        <div className="products-skeletons-list">
            {Array.from({ length: 6 }).map((_, index: number) => (
                <ProductSkeleton key={index} />
            ))}
        </div>
    );
};

export default ProductsSkeletons;
