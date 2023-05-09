export interface Reply {
    id: number;
    content: string;
    rootId: number | null;
    authorId: string;
    createTime: Date;
}

export interface RootReply extends Reply {
    extra: {
        replyCount: number;
        likeCount: number;
        isLike: boolean;
    };
}

export interface ChildReply extends Reply {
    extra: {
        likeCount: number;
        isLike: boolean;
    };
    receiver: {
        id: string;
        nickname: string;
    } | null;
}
