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
const changeOrderHandle = async (name: string = '') => {
    console.log(name);
    const nodes: Node[] = [];
    Object.assign(nodes, props.nodes);

    for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];
        await api.treeNode.upsert(item.node?.id || -1, {
            treeId: props.treeId,
            parentNodeId: props.parentNodeId,
            order: i,
            nodeId: item.id,
        });
    }
    // 刷新知识树
    await api.tree.updateTime(props.treeId);
    refreshTreeDetail();
};

// 点击移除
const deleteHandle = async (index: number) => {
    await api.treeNode.delete(props.nodes[index].node.id).then(async () => {
        props.nodes.splice(index, 1);
        await changeOrderHandle('del');
    });
};
</script>

<template>
    <section class="tree-node-list">
        {{ props.nodes.length }}
        <drag-list
            :list="props.nodes"
            item-key="node.id"
            group="chunk"
            v-slot="drag"
            @add="changeOrderHandle('add')"
            @remove="changeOrderHandle('remove')"
            @update="changeOrderHandle('update')"
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
