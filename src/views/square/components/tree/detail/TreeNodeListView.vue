<script setup lang="ts">
import { TreeNode as Node } from '@/api/tree/treeNode/types';

interface Props {
    treeId: number;
    nodes: Node[];
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="tree-node-list">
        <tree-node-view
            v-for="(item, index) of props.nodes"
            :key="index"
            :item="item"
            :treeId="props.treeId"
        ></tree-node-view>
    </section>
</template>

<style lang="scss" scoped></style>
