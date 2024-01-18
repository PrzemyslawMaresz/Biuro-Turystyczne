export interface User {
    id?: string;
    uid: string | undefined;
    username: string;
    role: string;
    isBanned: boolean;
}