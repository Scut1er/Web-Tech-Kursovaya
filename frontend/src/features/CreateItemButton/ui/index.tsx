"use client";

import { useCreateItemMutation } from "@entities/Room/api";
import { ReactElement, useState } from "react";
import { ItemModal } from "@widgets/ItemModal";
import { ItemForm } from "@features/ItemForm";
import "./style.css";

interface CreateItemButtonProps {
    roomId: string;
}

const CreateItemButton = ({ roomId }: CreateItemButtonProps): ReactElement => {
    const [createItem, { isLoading }] = useCreateItemMutation();

    const [visible, setVisible] = useState(false);

    const handleSubmit = async (data: {
        name: string;
        quantity: string;
        category: string;
    }) => {
        await createItem({ roomId, itemUserChangeData: data });

        setVisible(false);
    };

    return (
        <div className="create-item-button">
            <div
                className="item-card item-card-empty"
                onClick={() => setVisible(true)}
            >
                <div className="item-card-info">
                    <div className="typography-card-title">+ Add Item</div>
                    <div className="typography-card-id">
                        Click to create new item
                    </div>
                </div>
            </div>

            <ItemModal
                visible={visible}
                onHide={() => setVisible(false)}
                header="Create New Item"
            >
                <ItemForm
                    onSubmit={handleSubmit}
                    submitLabel="Create"
                    loading={isLoading}
                />
            </ItemModal>
        </div>
    );
};

export default CreateItemButton;
