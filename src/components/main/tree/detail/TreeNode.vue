<script setup lang="ts">
import { TreeNode } from '@/api/tree/treeNode/types';

interface Props {
    node: TreeNode;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="tree-node pl-5">
        <!-- 节点名 -->
        {{ props.node.name }}
        <!-- 节点前言 -->
        {{ props.node.preface }}
        <!-- 节点内容 -->
        <!-- 子节点 -->
        <child-node v-for="(item, index) of node.nodes" :key="index" :node="item"></child-node>
        <!-- 节点尾注 -->
        {{ props.node.endnote }}
    </section>
</template>

<script lang="ts">
export default { name: 'child-node' };
</script>

<style lang="scss" scoped></style>
