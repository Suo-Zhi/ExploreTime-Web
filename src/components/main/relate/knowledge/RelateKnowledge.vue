<script setup lang="ts">
import { KnowledgeType } from '@/api/relate/types';

interface Props {
    type: KnowledgeType; // 需要展示的知识类型
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="relate-knowledge h-full">
        <relate-point-list v-if="props.type === 'point'"></relate-point-list>
        <relate-chunk-list v-else-if="props.type === 'chunk'"></relate-chunk-list>
        <relate-tree-list v-else-if="props.type === 'tree'"></relate-tree-list>
    </section>
</template>

<style lang="scss" scoped></style>
