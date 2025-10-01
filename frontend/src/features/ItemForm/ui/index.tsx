"use client";

import { FormEvent, ReactElement, useState } from "react";
import { InputText } from "primereact/inputtext";
import { IItem } from "@entities/Item/types";
import { Button } from "primereact/button";
import "./style.css";

interface ItemFormProps {
    initialData?: Pick<IItem, "name" | "quantity" | "category">;
    onSubmit: (data: Pick<IItem, "name" | "quantity" | "category">) => void;
    loading?: boolean;
}

export const ItemForm = ({
    initialData,
    onSubmit,
    loading = false,
}: ItemFormProps): ReactElement => {
    const [name, setName] = useState(initialData?.name || "");
    const [quantity, setQuantity] = useState(initialData?.quantity || "");
    const [category, setCategory] = useState(initialData?.category || "");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        onSubmit({ name, quantity, category });
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <label>
                Name
                <InputText
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Quantity
                <InputText
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </label>
            <label>
                Category
                <InputText
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </label>
            <Button label="Save" type="submit" loading={loading} />
        </form>
    );
};

export default ItemForm;
