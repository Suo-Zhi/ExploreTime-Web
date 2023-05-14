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
const refreshChunkBox = inject<any>('refreshChunkBox');
// const refreshTreeDetail = inject<any>('refreshTreeDetail');
const changeOrderHandle = async () => {
    for (let i = 0; i < props.nodes.length; i++) {
        const item = props.nodes[i];
        // upsert节点
        await api.treeNode
            .upsert(item.node?.id || -1, {
                treeId: props.treeId,
                parentNodeId: props.parentNodeId,
                order: i,
                nodeId: item.id,
            })
            .then(async () => {
                // 将编程节点的知识块归档
                if (!item.isRefine) {
                    await api.chunk.toggleRefine(item.id, !item.isRefine);
                    refreshChunkBox();
                }
            });
    }
    // 更新知识树时间
    await api.tree.updateTime(props.treeId);
    // 刷新知识树(setTimeout用来防止刷新太快导致重复触发changeOrderHandle,这方法不是很好,以后改)
    setTimeout(() => {
        // refreshTreeDetail();
    }, 200);
};

// 点击移除
const deleteHandle = async (index: number) => {
    await api.treeNode.delete(props.nodes[index].node.id).then(async () => {
        props.nodes.splice(index, 1);
    });
};

// 防止前节点拖拽入后节点内时无法监听到add事件
let isDrag = true; // 是否触发拖拽列表事件
watch(
    () => props.nodes.length,
    (n, o) => {
        if (isDrag) {
            const diff = n - o;
            if (diff > 0) changeOrderHandle();
            else changeOrderHandle();
        }
    }
);

const activeIndex = ref(-1); // 需激活的节点索引
// 新增节点
const addNodeHandle = (index: number) => {
    isDrag = false;
    // 往列表指定位置插入空白项
    props.nodes.splice(index, 0, {
        id: -1,
        name: '',
        preface: '',
        endnote: '',
        content: [],
        node: {
            id: -1,
            treeId: props.treeId,
            parentNodeId: props.parentNodeId,
            order: index,
            children: [],
        },
        level: {
            deep: 1,
            prefix: '',
        },
        isRefine: true,
        isDel: false,
        authorId: store.user().userinfo?.id || '',
        createTime: new Date(),
        updateTime: new Date(),
    });
    // 激活新空白项
    activeIndex.value = index;
};
defineExpose({
    addNodeHandle,
});
</script>

<template>
    <section class="tree-node-list">
        <add-line-one
            v-if="props.parentNodeId == null"
            @add="addNodeHandle(0)"
            text="新增节点"
            color="green-500"
        ></add-line-one>
        <drag-list
            :list="props.nodes"
            item-key="node.id"
            group="chunk"
            v-slot="drag"
            @update="changeOrderHandle"
            class="min-h-[20px]"
        >
            <tree-node
                :treeId="props.treeId"
                :item="drag.item"
                :isEdit="activeIndex === drag.index"
                @active="activeIndex = drag.index"
                @blur="activeIndex = -1"
                @add="addNodeHandle"
                @create="
                    isDrag = true;
                    changeOrderHandle();
                "
                @delete="deleteHandle(drag.index)"
            ></tree-node>
            <add-line-one
                @add="addNodeHandle(drag.index + 1)"
                text="新增节点"
                color="green-500"
            ></add-line-one>
        </drag-list>
    </section>
</template>

<style lang="scss" scoped></style>
