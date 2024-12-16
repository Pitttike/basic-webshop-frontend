
export interface FormInput {
    username: string;
    password: string;
}

export interface ApiStatus {
    message: string;
    success?: boolean
}
export interface ValidationRule {
    condition: boolean;
    message: string;
}

export interface User {
    id: number;
    username? : string;
}