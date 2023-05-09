export default {
    // 关注
    create(targetId: string) {
        return http.post('follow', {
            targetId,
        });
    },

    // 判断是否关注
    isFollow(targetId: string) {
        return http.get('follow/is', {
            params: {
                targetId,
                followerId: store.user().userinfo?.id,
            },
        });
    },
};
