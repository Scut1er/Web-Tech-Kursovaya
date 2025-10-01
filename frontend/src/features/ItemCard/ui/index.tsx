"use client";

import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { InputSwitch } from "primereact/inputswitch";
import { IItem } from "@entities/Item/types";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import {
    NotificationsSeverityTypes,
    NotificationsMessages,
} from "@utils/constants";
import {
    useDeleteItemMutation,
    useToggleItemPurchasedMutation,
} from "@entities/Room/api";
import "./style.css";

interface ItemCardProps {
    roomId: string;
    item: IItem;
}

export const ItemCard = ({ roomId, item }: ItemCardProps): ReactElement => {
    const dispatch = useDispatch();

    const [deleteItem] = useDeleteItemMutation();
    const [toggleItemPurchased, { isLoading: toggleLoading }] =
        useToggleItemPurchasedMutation();

    const handleDelete = async () => {
        try {
            await deleteItem({ roomId, itemId: item.id }).unwrap();
            dispatch(
                addNotification({
                    text: NotificationsMessages.ITEM_DELETED,
                    severity: NotificationsSeverityTypes.SUCCESS,
                })
            );
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.ERROR,
                })
            );
        }
    };

    const handleToggle = async () => {
        try {
            await toggleItemPurchased({ roomId, itemId: item.id }).unwrap();
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.ERROR,
                })
            );
        }
    };

    const purchasedClassname: string = !item.is_purchased ? "" : "purchased";

    return (
        <div className={`item-card ${purchasedClassname}`}>
            <div className="item-card-info">
                <div className="typography-card-title">{item.name}</div>
                <div className="typography-card-id">
                    {item.quantity} • {item.category}
                </div>
            </div>
            <div className="item-card-actions">
                <InputSwitch
                    checked={item.is_purchased}
                    onChange={handleToggle}
                    disabled={toggleLoading}
                />
                <Button
                    className="item-card-delete"
                    label="Delete"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
};

export default ItemCard;
