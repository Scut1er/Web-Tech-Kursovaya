"use client";

import { addNotification } from "@store/slices/Notifications";
import { MouseEvent, type ReactElement } from "react";
import type { IDish } from "@entities/Recipe/type";
import { useDispatch } from "react-redux";
import {
    NotificationsMessages,
    NotificationsSeverityTypes,
} from "@utils/constants";
import "./style.css";

interface RecipeCardProps {
    dish: IDish;
}

const RECIPE_SEARCH_URL_PREFIX: string = "https://www.google.com/search?q=";

export const RecipeCard = ({ dish }: RecipeCardProps): ReactElement => {
    const dispatch = useDispatch();

    const handleSearchRecipe = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();

        dispatch(
            addNotification({
                text: NotificationsMessages.RECIPE_SEARCH_OPENED,
                severity: NotificationsSeverityTypes.INFO,
            })
        );

        window.open(`${RECIPE_SEARCH_URL_PREFIX}${dish.title}`);
    };

    return (
        <div className="recipe-card" onClick={handleSearchRecipe}>
            <div className="recipe-card-title typography-card-title">
                {dish.title}
            </div>
            {dish.need && dish.need.length > 0 && (
                <ul className="recipe-card-need">
                    {dish.need.map((ingredient: string, idx: number) => (
                        <li key={idx} className="typography-caption">
                            {ingredient}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipeCard;
