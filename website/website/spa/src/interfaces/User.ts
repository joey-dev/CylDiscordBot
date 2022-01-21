export interface User {
    id: number;
    username: string;
    token: string;
    user_id: string;
}

export interface OptionalUser {
    id?: number;
    username?: string;
    token?: string;
    user_id?: string;
}
