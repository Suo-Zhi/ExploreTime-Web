<script setup lang="ts">
import { Learner } from '@/api/learner/types';

interface Props {
    id: string;
    showFollow?: boolean; // 是否显示关注按钮
}
const props = withDefaults(defineProps<Props>(), {
    showFollow: false,
});

// 获取用户信息
let user = ref({
    avatar: '',
    nickname: '',
} as Learner);
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
</script>

<template>
    <!-- 用户信息 -->
    <section class="userinfo flex items-center">
        <!-- 头像 -->
        <avatar :img="user.avatar" :text="user.nickname"></avatar>

        <span class="ml-2 text-[16px] text-slate-700">{{ user.nickname }}</span>
        <!-- 关注按钮 -->
        <a-button
            v-if="props.showFollow"
            :type="user.isFollow ? 'outline' : 'primary'"
            size="mini"
            class="ml-2"
        >
            {{ user.isFollow ? '取消关注' : '关注' }}
        </a-button>
    </section>
</template>

<style lang="scss" scoped></style>
