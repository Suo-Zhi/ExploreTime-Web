export interface Reply {
    id: number;
    content: string;
    rootId: number | null;
    createTime: Date;
}

export interface RootReply extends Reply {
    extra: {
        replyCount: number;
        likeCount: number;
        isLike: {
            value: boolean;
            id: number | null;
        };
    };
    authorId: string;
}

export interface ChildReply extends Reply {
    extra: {
        likeCount: number;
        isLike: {
            value: boolean;
            id: number | null;
        };
    };
    author: {
        id: string;
        nickname: string;
    };
    receiver: {
        id: string;
        nickname: string;
    } | null;
}
