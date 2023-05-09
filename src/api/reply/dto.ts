export interface CreateReplyDTO {
    content: string;
    feedbackId: number;
    rootId: number | null;
    receiverId: string | null;
}
