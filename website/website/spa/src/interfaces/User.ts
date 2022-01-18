export interface User {
    userId: number;
    username: string;
    token: string;
}

export interface OptionalUser {
    userId?: number;
    username?: string;
    token?: string;
}
