<script setup lang="ts">
import { TreeNode } from '@/api/tree/treeNode/types';

interface Props {
    node: TreeNode;
    parentLevel?: string;
}
const props = withDefaults(defineProps<Props>(), {});

// 标题层级
const level = tool.getTitleLevel(props.node.deep, props.node.order, props.parentLevel);
</script>

<template>
    <section class="tree-node">
        <!-- 节点名 -->
        <title-level :deep="props.node.deep" :level="level">
            {{ props.node.name }}
        </title-level>
        <!-- 节点前言 -->
        {{ props.node.preface }}
        <!-- 节点内容 -->
        <!-- 子节点 -->
        <child-node
            v-for="(item, index) of node.nodes"
            :key="index"
            :node="item"
            :parentLevel="level"
        ></child-node>
        <!-- 节点尾注 -->
        {{ props.node.endnote }}
    </section>
</template>

<script lang="ts">
export default { name: 'child-node' };
</script>

<style lang="scss" scoped></style>
