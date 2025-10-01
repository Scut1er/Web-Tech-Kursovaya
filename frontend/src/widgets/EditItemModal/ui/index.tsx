"use client";

import { ItemForm } from "@features/ItemForm";
import { IItem } from "@entities/Item/types";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface EditItemModalProps {
    visible: boolean;
    onHide: () => void;
    item: IItem;
    onSave: (data: Pick<IItem, "name" | "quantity" | "category">) => void;
    loading?: boolean;
}

export const EditItemModal = ({
    visible,
    onHide,
    item,
    onSave,
    loading = false,
}: EditItemModalProps): ReactElement => {
    return (
        <Dialog
            header="Edit Item"
            visible={visible}
            onHide={onHide}
            style={{ width: "400px" }}
        >
            <ItemForm initialData={item} onSubmit={onSave} loading={loading} />
        </Dialog>
    );
};

export default EditItemModal;
