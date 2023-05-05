<script setup lang="ts">
import { UpdatePointDTO } from '@/api/point/dto';
import { TreeNode } from '@/api/tree/treeNode/types';

interface Props {
    node: TreeNode;
    parentLevel?: string;
}
const props = withDefaults(defineProps<Props>(), {});

// 标题层级
const level = tool.getTitleLevel(props.node.deep, props.node.order, props.parentLevel);

/* 块操作 */
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

/* 块内容操作 */
const activeIndex = ref(-1); // 激活块内容索引
// 更新块内容
const refreshPointBox = inject<any>('refreshPointBox');
const updateContentHandle = async (newValue: UpdatePointDTO) => {
    const target = props.node.content[activeIndex.value];
    await api.point.update(target.id, newValue).then(() => {
        // 简易刷新
        target.name = newValue.name;
        target.content = newValue.content;
        refreshPointBox(); // 刷新知识点列表
    });
    activeIndex.value = -1;
};
</script>

<template>
    <card-fold class="mb-3 pb-2">
        <template #title>
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
        </template>

        <template #actions>
            <div class="action-bar mr-2">
                <icon-link-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="关联情况"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                />
                <icon-reduce
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-red-600"
                    title="移出"
                />
            </div>
        </template>

        <!-- 节点主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 节点前言 -->
            <div class="preface !py-1 !mt-3 mb-1">
                <edit-item
                    :value="props.node.preface"
                    :isEdit="editTarget === 'preface'"
                    placeholder="请输入知识块前言"
                    @editStart="editStartHandle('preface')"
                    @changeValue="newValue.preface = $event"
                    @editEnd="editEndHandle"
                ></edit-item>
            </div>

            <!-- 节点内容列表 -->
            <div class="node-content mb-2">
                <chunk-content
                    v-for="(item, index) of props.node.content"
                    :key="index"
                    v-show="!item.isDel"
                    :item="item"
                    :isEdit="activeIndex === index"
                    @active="activeIndex = index"
                    @blur="activeIndex = -1"
                    @update="updateContentHandle"
                ></chunk-content>
            </div>

            <!-- 子节点 -->
            <child-node
                v-for="(item, index) of node.nodes"
                :key="index"
                :node="item"
                :parentLevel="level"
            ></child-node>

            <!-- 节点尾注 -->
            <div class="endnote">
                <edit-item
                    :value="props.node.endnote"
                    :isEdit="editTarget === 'endnote'"
                    placeholder="请输入知识块尾注"
                    @editStart="editStartHandle('endnote')"
                    @changeValue="newValue.endnote = $event"
                    @editEnd="editEndHandle"
                ></edit-item>
            </div>
        </div>
    </card-fold>
</template>

<script lang="ts">
export default { name: 'child-node' };
</script>

<style lang="scss" scoped></style>
