export interface User {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    roles?: string[];
}

export interface OptionalUser {
    userId?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    roles?: string[];
}
