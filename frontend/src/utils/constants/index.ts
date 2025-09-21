import { IProduct } from "@entities/Product/types";

export interface IRouteData {
    id: string;
    path: string;
}

export const routesData = {
    AUTHORIZATION: {
        id: "authorization",
        path: "/authorization",
    },
    LOBBY: {
        id: "lobby",
        path: "/lobby",
    },
    ROOM: {
        id: "room",
        path: "/room",
    },
};

export const routesDataList: IRouteData[] = [
    {
        ...routesData.AUTHORIZATION,
    },
    {
        ...routesData.LOBBY,
    },
    {
        ...routesData.ROOM,
    },
];

export const enum ApiEndpoints {
    PRODUCTS = "products",
}
