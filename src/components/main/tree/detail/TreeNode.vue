<script setup lang="ts">
import { TreeNode } from '@/api/tree/treeNode/types';

interface Props {
    node: TreeNode;
    parentLevel?: string;
}
const props = withDefaults(defineProps<Props>(), {});

// 标题层级
const level = tool.getTitleLevel(props.node.deep, props.node.order, props.parentLevel);

// 编辑前处理
const newValue = ref({ name: '', preface: '', endnote: '' }); // 新值
const editTarget = ref(''); // 编辑目标
const editStartHandle = (target: 'name' | 'preface' | 'endnote') => {
    // 同步值
    newValue.value.name = props.node.name;
    newValue.value.preface = props.node.preface;
    newValue.value.endnote = props.node.endnote;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const refreshChunkBox = inject<any>('refreshChunkBox');
const editEndHandle = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识块名', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.name === props.node.name &&
        newValue.value.preface === props.node.preface &&
        newValue.value.endnote === props.node.endnote
    )
        return (editTarget.value = '');

    // 更新树节点
    await api.chunk.update(props.node.id, newValue.value).then(() => {
        // 刷新
        props.node.name = newValue.value.name;
        props.node.preface = newValue.value.preface;
        props.node.endnote = newValue.value.endnote;
        refreshChunkBox();
    });
    editTarget.value = ''; // 取消编辑状态
};
</script>

<template>
    <section class="tree-node">
        <!-- 节点名 -->
        <title-level :deep="props.node.deep" :level="level">
            <edit-item
                type="text"
                :value="props.node.name"
                :isEdit="editTarget === 'name'"
                placeholder="请输入知识块名"
                class="title w-auto"
                @editStart="editStartHandle('name')"
                @changeValue="newValue.name = $event"
                @editEnd="editEndHandle"
            ></edit-item>
        </title-level>
        <!-- 节点前言 -->
        <div
            class="preface py-1 pl-1 rounded-sm relative bg-gradient-to-l from-slate-50 to-blue-50"
        >
            <edit-item
                :value="props.node.preface"
                :isEdit="editTarget === 'preface'"
                placeholder="请输入知识块前言"
                @editStart="editStartHandle('preface')"
                @changeValue="newValue.preface = $event"
                @editEnd="editEndHandle"
            ></edit-item>
        </div>
        <!-- 节点内容 -->
        <!-- 子节点 -->
        <child-node
            v-for="(item, index) of node.nodes"
            :key="index"
            :node="item"
            :parentLevel="level"
        ></child-node>
        <!-- 节点尾注 -->
        <div
            class="endnote py-1 pl-1 rounded-sm relative bg-gradient-to-l from-slate-50 to-slate-100"
        >
            <edit-item
                :value="props.node.endnote"
                :isEdit="editTarget === 'endnote'"
                placeholder="请输入知识块尾注"
                @editStart="editStartHandle('endnote')"
                @changeValue="newValue.endnote = $event"
                @editEnd="editEndHandle"
            ></edit-item>
        </div>
    </section>
</template>

<script lang="ts">
export default { name: 'child-node' };
</script>

<style lang="scss" scoped></style>
