<script setup lang="ts">
import { Learner } from '@/api/learner/types';

interface Props {
    id: string; // 目标用户Id
    showFollow?: boolean; // 是否显示关注按钮
}
const props = withDefaults(defineProps<Props>(), {
    showFollow: false,
});

// 获取用户信息
let user = ref({} as Learner);
const getUserInfo = async () => {
    if (props.id === '') {
        user.value.avatar = '';
        user.value.nickname = '空用户';
    } else {
        await api.learner.findOne(props.id).then((res) => {
            user.value = res.data;
        });
    }
};
watch(
    () => props.id,
    () => {
        getUserInfo();
    },
    { immediate: true }
);

// 切换关注状态
const toggleFollowHandle = async () => {
    // 关注
    if (!user.value.isFollow.value) {
        await api.follow.create(user.value.id).then((res) => {
            user.value.isFollow = {
                value: true,
                id: res.data.id,
            };
        });
    }
    // 取消关注
    else {
        await api.follow.delete(user.value.id).then(() => {
            user.value.isFollow = {
                value: false,
                id: null,
            };
        });
    }
};

const self = store.user(); // 当前使用者
</script>

<template>
    <!-- 用户信息 -->
    <section class="userinfo flex items-center">
        <!-- 头像 -->
        <avatar :img="user.avatar" :text="user.nickname"></avatar>
        <!-- 昵称 -->
        <span class="ml-2 text-[16px] text-slate-700">{{ user.nickname }}</span>
        <!-- 关注按钮 -->
        <a-button
            v-if="props.showFollow && props.id !== self.userinfo?.id"
            :type="user.isFollow?.value ? 'outline' : 'primary'"
            size="mini"
            class="ml-2"
            @click="toggleFollowHandle"
        >
            {{ user.isFollow?.value ? '取消关注' : '关注' }}
        </a-button>
    </section>
</template>

<style lang="scss" scoped></style>
