export interface Feedback {
    id: number;
    content: string;
    extra: {
        replyCount: number;
        likeCount: number;
        isLike: {
            value: boolean;
            id: number | null;
        };
    };
    authorId: string;
    createTime: Date;
}
