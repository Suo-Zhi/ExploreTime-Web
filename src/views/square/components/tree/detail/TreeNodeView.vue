<script setup lang="ts">
import { TreeNode } from '@/api/tree/treeNode/types';

interface Props {
    treeId: number;
    item: TreeNode; // 节点
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '块关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'chunk',
    });
};
</script>

<template>
    <card-fold class="mt-[8px] mb-[5px]">
        <template #title>
            <title-level :level="props.item.level">
                <text-view :text="props.item.name" />
            </title-level>
        </template>

        <template #actions>
            <div class="action-bar mr-2">
                <icon-link-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(item.id, 'chunk')"
                />
            </div>
        </template>

        <!-- 节点主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 节点前言 -->
            <div class="preface !py-1 !mt-3 mb-1">
                <text-view :text="props.item.preface" />
            </div>

            <!-- 块内容列表 -->
            <div class="node-content mb-2">
                <chunk-content-view
                    v-for="(item, index) of props.item.content"
                    :key="index"
                    v-show="!item.isDel"
                    :item="item"
                    class="mt-[2px]"
                ></chunk-content-view>
            </div>

            <!-- 子节点列表 -->
            <tree-node-list-view
                :treeId="props.treeId"
                :parentNodeId="props.item.node?.id || -1"
                :deep="props.item.level?.deep || 1"
                :parentPrefix="props.item.level?.prefix || ''"
                :nodes="props.item.node?.children || []"
                ref="childNodesRef"
            ></tree-node-list-view>

            <!-- 节点尾注 -->
            <div class="endnote mt-[5px]">
                <text-view :text="props.item.endnote" />
            </div>
        </div>
    </card-fold>
</template>

<script lang="ts">
export default { name: 'child-node' };
</script>

<style lang="scss" scoped></style>
