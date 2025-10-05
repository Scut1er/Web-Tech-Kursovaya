export interface IUserPersonalData {
    id: number;
    username: string;
    created_at: string;
}

export interface IAuthSession {
    token: string;
    user: IUserPersonalData;
}

export interface IAuthBody {
    username: string;
    password: string;
}

export const enum RoomParticipantRoles {
    OWNER = "owner",
}

export type TRoomParticipant = Omit<IUserPersonalData, "created_at"> & {
    user_id: number;
    joined_at: string;
    role: RoomParticipantRoles;
};
