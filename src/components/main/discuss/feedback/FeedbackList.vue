<script setup lang="ts">
const isLoad = ref(false);

const list = ref([
    {
        id: 1,
        content: '11111111',
        targetType: 'tree',
        targetId: '1',
        extra: {
            replyCount: 1,
            likeCount: 3,
            isLike: true,
        },
        authorId: 'jerry',
        createTime: new Date(),
    },
    {
        id: 2,
        content: '22222222',
        targetType: 'tree',
        targetId: '1',
        extra: {
            replyCount: 2,
            likeCount: 4,
            isLike: false,
        },
        authorId: 'jerry',
        createTime: new Date(),
    },
]);
</script>

<template>
    <load-box :isLoad="isLoad" class="h-full">
        <scroll-bar>
            <feedback-item v-for="(item, index) of list" :key="index" :item="item"></feedback-item>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
