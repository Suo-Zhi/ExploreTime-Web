<script setup lang="ts">
import { TreeNode as Node } from '@/api/tree/treeNode/types';

interface Props {
    treeId: number;
    parentNodeId: number | null;
    deep: number;
    parentPrefix: string;
    nodes: Node[];
}
const props = withDefaults(defineProps<Props>(), {});

// 改变节点顺序
const refreshTreeDetail = inject<any>('refreshTreeDetail');
const changeOrderHandle = async () => {
    for (let i = 0; i < props.nodes.length; i++) {
        const item = props.nodes[i];
        await api.treeNode.upsert(item.node?.id || -1, {
            treeId: props.treeId,
            parentNodeId: props.parentNodeId,
            order: i,
            nodeId: item.id,
        });
    }
    // 更新知识树时间
    await api.tree.updateTime(props.treeId);
    // 刷新知识树(setTimeout用来防止刷新太快导致重复触发changeOrderHandle,这方法不是很好,以后改)
    setTimeout(() => {
        refreshTreeDetail();
    }, 200);
};

// 点击移除
const deleteHandle = async (index: number) => {
    await api.treeNode.delete(props.nodes[index].node.id).then(async () => {
        props.nodes.splice(index, 1);
    });
};

// 防止前节点拖拽入后节点内时无法监听到add事件
watch(
    () => props.nodes.length,
    (n, o) => {
        const diff = n - o;
        if (diff > 0) changeOrderHandle();
        else changeOrderHandle();
    }
);
</script>

<template>
    <section class="tree-node-list">
        <drag-list
            :list="props.nodes"
            item-key="node.id"
            group="chunk"
            v-slot="drag"
            @update="changeOrderHandle()"
            class="min-h-[20px]"
        >
            <tree-node
                :treeId="props.treeId"
                :item="drag.item"
                @delete="deleteHandle(drag.index)"
            ></tree-node>
        </drag-list>
    </section>
</template>

<style lang="scss" scoped></style>
