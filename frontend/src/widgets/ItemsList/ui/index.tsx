"use client";

import ErrorParser from "@shared/services/ErrorParser";
import { ProductsSkeletons } from "@shared/common/ProductsSkeletons";
import { addNotification } from "@store/slices/Notifications";
import { NotificationsSeverityTypes } from "@utils/constants";
import { useLoadItemsQuery } from "@entities/Room/api";
import { ItemCard } from "@features/ItemCard";
import { IItem } from "@entities/Item/types";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import "./style.css";

interface ItemsListProps {
    roomId: string;
}

export const ItemsList = ({ roomId }: ItemsListProps): ReactElement => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useLoadItemsQuery({ public_id: roomId });

    if (isLoading) {
        return <ProductsSkeletons />;
    }

    if (error || !data) {
        dispatch(
            addNotification({
                text: ErrorParser.parseAxiosError(error),
                severity: NotificationsSeverityTypes.ERROR,
            })
        );

        return <div className="items-list-error">Error loading items</div>;
    }

    if (!data.length) {
        return <div className="items-list-empty">No items found</div>;
    }

    const filteredData = [...data].sort(
        (item1: IItem, item2: IItem) =>
            Number(item2.is_purchased) - Number(item1.is_purchased)
    );

    return (
        <div className="items-list">
            {filteredData.map((item: IItem) => (
                <ItemCard key={item.id} item={item} roomId={roomId} />
            ))}
        </div>
    );
};

export default ItemsList;
