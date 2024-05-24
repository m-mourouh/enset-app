export interface User {
    id: string,
    password: string,
    roles: string[],
    token: string
}

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}