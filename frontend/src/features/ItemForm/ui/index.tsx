"use client";

import { FormEvent, ReactElement, useState } from "react";
import { InputText } from "primereact/inputtext";
import { IItem } from "@entities/Item/types";
import { Button } from "primereact/button";
import "./style.css";

interface ItemFormProps {
    initialData?: Partial<Pick<IItem, "name" | "quantity" | "category">>;
    onSubmit: (data: {
        name: string;
        quantity: string;
        category: string;
    }) => void;
    submitLabel?: string;
    loading?: boolean;
}

const ItemForm = ({
    initialData,
    onSubmit,
    loading = false,
    submitLabel = "Save",
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
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Quantity
                <InputText
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </label>
            <label>
                Category
                <InputText
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </label>
            <Button type="submit" loading={loading}>
                {submitLabel}
            </Button>
        </form>
    );
};

export default ItemForm;
