export interface UserState {
    userinfo: UserInfo | null;
}

export interface UserInfo {
    id: string;
    nickname: string;
    email: string | null;
    phone: string | null;
    avatar: string;
    intro: string | null;
}
