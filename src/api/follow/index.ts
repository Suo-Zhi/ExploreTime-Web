export default {
    // 关注
    create(targetId: string) {
        return http.post('follow', {
            targetId,
        });
    },
};
