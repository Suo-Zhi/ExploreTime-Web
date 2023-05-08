<script setup lang="ts">
import { KnowledgeType } from '@/api/relate/types';

interface Props {
    type: KnowledgeType; // 需要展示的知识类型
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="relate-knowledge h-full">
        <relate-point-list-view v-if="props.type === 'point'"></relate-point-list-view>
        <relate-chunk-list-view v-else-if="props.type === 'chunk'"></relate-chunk-list-view>
        <relate-tree-list-view v-else-if="props.type === 'tree'"></relate-tree-list-view>
    </section>
</template>

<style lang="scss" scoped></style>
