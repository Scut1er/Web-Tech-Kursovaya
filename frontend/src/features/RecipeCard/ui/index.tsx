"use client";

import { IDish } from "@entities/Recipe/type";
import { type ReactElement } from "react";
import "./style.css";

interface RecipeCardProps {
    dish: IDish;
}

export const RecipeCard = ({ dish }: RecipeCardProps): ReactElement => {
    return (
        <div className="recipe-card">
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
