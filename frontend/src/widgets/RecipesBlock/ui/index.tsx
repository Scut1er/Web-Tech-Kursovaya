"use client";

import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { RoomApiAiProviders } from "@entities/Room/api";
import { ReactElement, useMemo, useState } from "react";
import { SelectItem } from "primereact/selectitem";
import { RecipesList } from "@widgets/RecipesList";
import "./style.css";

interface RecipesBlockProps {
    roomId: string;
}

export const RecipesBlock = ({ roomId }: RecipesBlockProps): ReactElement => {
    const [aiProvider, setAiProvider] = useState<RoomApiAiProviders>(
        RoomApiAiProviders.MISTRAL
    );

    const handleProviderSelect = (event: DropdownChangeEvent): void => {
        setAiProvider(event.value);
    };

    const aiProviderDropdownOptions: SelectItem[] = useMemo(
        () =>
            Object.values(RoomApiAiProviders).map(
                (aiProviderValue: string) => ({
                    label: aiProviderValue,
                    value: aiProviderValue,
                })
            ),
        []
    );

    return (
        <div className="recipes-block">
            <Dropdown
                onChange={handleProviderSelect}
                options={aiProviderDropdownOptions}
                value={aiProvider}
            />
            <RecipesList roomId={roomId} provider={aiProvider} />
        </div>
    );
};

export default RecipesBlock;
