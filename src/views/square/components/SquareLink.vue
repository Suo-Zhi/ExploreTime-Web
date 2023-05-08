<script setup lang="ts">
import { HistoryLink } from '@/store/setting/types';

const activeIndex = ref(0);
const links = ref<HistoryLink[]>([
    {
        targetId: 1,
        targetType: '',
        linkTitle: '测试测试',
        linkType: 'treeDetail',
    },
    {
        targetId: 1,
        targetType: '',
        linkTitle: '测试测试',
        linkType: 'treeDetail',
    },
]);
</script>

<template>
    <section class="square-links">
        <a-tag
            v-for="(link, index) of links"
            :key="index"
            :color="index === activeIndex ? 'cyan' : 'blue'"
            class="ml-2 select-none"
        >
            <span class="cursor-pointer">
                {{ link.linkTitle }}
            </span>
            <icon-close-small
                size="16"
                :strokeWidth="3"
                class="cursor-pointer text-primary hover:text-orange-400 duration-200 -mr-[6px]"
            />
        </a-tag>
    </section>
</template>

<style lang="scss" scoped></style>
