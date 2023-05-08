export interface Feedback {
    id: number;
    content: string;
    extra: {
        replyCount: number;
        likeCount: number;
        isLike: boolean;
    };
    authorId: string;
    createTime: Date;
}
