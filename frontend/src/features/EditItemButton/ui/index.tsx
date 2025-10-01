"use client";

import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { NotificationsSeverityTypes } from "@utils/constants";
import { useUpdateItemMutation } from "@entities/Room/api";
import { Fragment, ReactElement, useState } from "react";
import { EditItemModal } from "@widgets/EditItemModal";
import { IItem } from "@entities/Item/types";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";

interface EditItemButtonProps {
    item: IItem;
    roomId: string;
}

export const EditItemButton = ({
    item,
    roomId,
}: EditItemButtonProps): ReactElement => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [updateItem, { isLoading }] = useUpdateItemMutation();

    const handleSave = async (
        data: Pick<IItem, "name" | "quantity" | "category">
    ) => {
        try {
            await updateItem({
                roomId,
                itemId: item.id,
                itemUserChangeData: data,
            }).unwrap();
            setVisible(false);
        } catch (error: unknown) {
            dispatch(
                addNotification({
                    text: ErrorParser.parseAxiosError(error),
                    severity: NotificationsSeverityTypes.ERROR,
                })
            );
        }
    };

    return (
        <Fragment>
            <Button
                label="Edit"
                onClick={() => setVisible(true)}
                disabled={isLoading}
            />
            <EditItemModal
                visible={visible}
                onHide={() => setVisible(false)}
                item={item}
                onSave={handleSave}
                loading={isLoading}
            />
        </Fragment>
    );
};
