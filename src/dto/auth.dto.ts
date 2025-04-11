export interface UserDto {
    user_id: number;
    username: string;
    password: string;
    email: string;
    full_name: string;
    mobile: string;
    role_id: number;
    role?: {
        role_id: number;
        role_name: string;
    };
}