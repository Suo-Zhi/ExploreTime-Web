export interface Reply {
    id: number;
    content: string;
    extra: {
        replyCount: number;
        likeCount: number;
        isLike: boolean;
    };
    rootId: number | null;
    authorId: string;
    createTime: Date;
}

export interface ChildReply extends Reply {
    receiver: {
        nickname: string;
    };
}
