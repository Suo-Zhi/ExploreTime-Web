export interface LoginDTO {
    id: string;
    password: string;
}

export interface RegisterDTO extends LoginDTO {
    nickname: string;
    password_confirm: string;
}
