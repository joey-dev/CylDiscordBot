export interface IUser {
    id: number;
    username: string;
    token: string;
    user_id: string;
}

export interface IOptionalUser {
    id?: number;
    username?: string;
    token?: string;
    user_id?: string;
}

export interface IUserLogin {
    user_id: string;
}
