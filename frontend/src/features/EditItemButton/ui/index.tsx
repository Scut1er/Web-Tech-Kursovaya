"use client";

import ErrorParser from "@shared/services/ErrorParser";
import { addNotification } from "@store/slices/Notifications";
import { NotificationsSeverityTypes } from "@utils/constants";
import { useUpdateItemMutation } from "@entities/Room/api";
import { type ReactElement, useState } from "react";
import { ItemModal } from "@widgets/ItemModal";
import { ItemForm } from "@features/ItemForm";
import { IItem } from "@entities/Item/types";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";

interface EditItemButtonProps {
    item: IItem;
    roomId: string;
}

const EditItemButton = ({
    item,
    roomId,
}: EditItemButtonProps): ReactElement => {
    const dispatch = useDispatch();

    const [updateItem, { isLoading }] = useUpdateItemMutation();

    const [visible, setVisible] = useState<boolean>(false);

    const handleSave = async (
        data: Pick<IItem, "name" | "quantity" | "category">
    ): Promise<void> => {
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
        <div className="edit-item-button">
            <Button
                label="Edit"
                onClick={() => setVisible(true)}
                disabled={isLoading}
            />
            <ItemModal
                visible={visible}
                onHide={() => setVisible(false)}
                header="Edit Item"
            >
                <ItemForm
                    initialData={item}
                    onSubmit={handleSave}
                    submitLabel="Save"
                    loading={isLoading}
                />
            </ItemModal>
        </div>
    );
};

export default EditItemButton;
