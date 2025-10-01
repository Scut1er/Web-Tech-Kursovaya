export interface IDish {
    title: string;
    need?: string[];
}

export interface IRecipe {
    dishes: IDish[];
}
