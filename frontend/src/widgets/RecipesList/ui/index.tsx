"use client";

import ErrorParser from "@shared/services/ErrorParser";
import useQueryRefetchManager from "@shared/hooks/useQueryRefetchManager";
import { RoomApiAiProviders, useLoadRecipesQuery } from "@entities/Room/api";
import { ProductsSkeletons } from "@shared/common/ProductsSkeletons";
import { addNotification } from "@store/slices/Notifications";
import { NotificationsSeverityTypes } from "@utils/constants";
import { RecipeCard } from "@features/RecipeCard";
import { IDish } from "@entities/Recipe/type";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import "./style.css";

interface RecipesBlockProps {
    roomId: string;
    provider: RoomApiAiProviders;
}

const RECIPES_REFETCH_INTERVAL: number = 30000;

const RecipesBlock = ({
    roomId,
    provider,
}: RecipesBlockProps): ReactElement => {
    const dispatch = useDispatch();

    const { data, isFetching, error, refetch } = useLoadRecipesQuery({
        public_id: roomId,
        provider,
    });

    useQueryRefetchManager(refetch, RECIPES_REFETCH_INTERVAL);

    if (isFetching) {
        return (
            <ProductsSkeletons
                listStyles={{ maxHeight: "100%", padding: "1rem" }}
                skeletonStyles={{ height: "7rem" }}
                skeletonsCount={5}
            />
        );
    }

    if (error || !data) {
        dispatch(
            addNotification({
                text: ErrorParser.parseAxiosError(error),
                severity: NotificationsSeverityTypes.ERROR,
            })
        );

        return <div className="recipes-list-error">Error loading recipes</div>;
    }

    if (!data.dishes.length) {
        return <div className="recipes-list-empty">No recipes found</div>;
    }

    return (
        <div className="recipes-list">
            {data.dishes.map((dish: IDish, index: number) => (
                <RecipeCard key={index} dish={dish} />
            ))}
        </div>
    );
};

export default RecipesBlock;
