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
        isLike: boolean;
    };
    authorId: string;
}

export interface ChildReply extends Reply {
    extra: {
        likeCount: number;
        isLike: boolean;
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
