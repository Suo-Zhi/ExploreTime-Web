<script setup lang="ts">
interface Props {
    targetId: string;
    text: string;
}
const props = withDefaults(defineProps<Props>(), {});

// 获取关注状态
const isFollow = ref(false);
const getFollowState = async () => {
    await api.follow.isFollow(props.targetId).then((res) => {
        isFollow.value = res.data;
    });
};
watch(
    () => props.targetId,
    () => {
        if (props.targetId) getFollowState();
    },
    { immediate: true }
);

// 切换关注状态
const toggleFollowHandle = async () => {
    // 关注
    if (!isFollow.value) {
        await api.follow.create(props.targetId).then(() => {
            isFollow.value = true;
        });
    }
};
</script>

<template>
    <!-- 更多操作 -->
    <a-popover
        v-if="props.targetId"
        position="left"
        :content-style="{ paddingTop: '2px', paddingBottom: '7px' }"
    >
        <icon-more size="20" :strokeWidth="3" class="action-btn hover:text-primary" title="更多" />
        <template #content>
            <div
                @click="toggleFollowHandle"
                class="mt-[6px] cursor-pointer text-center hover:text-primary"
            >
                <span v-if="!isFollow">关注{{ props.text }}</span>
                <span v-else>取消关注</span>
            </div>
            <slot></slot>
        </template>
    </a-popover>
</template>

<style lang="scss" scoped></style>
