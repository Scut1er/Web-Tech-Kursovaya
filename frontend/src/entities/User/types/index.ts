export interface IUserPersonalData {
    id: number;
    username: number;
    created_at: string;
}

export interface IAuthSession {
    token: string;
    user: IUserPersonalData;
}
