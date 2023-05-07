<script setup lang="ts">
import { UpdatePointDTO } from '@/api/point/dto';
import { TreeNode } from '@/api/tree/treeNode/types';

interface Props {
    treeId: number;
    item: TreeNode; // 节点
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const refreshChunkBox = inject<any>('refreshChunkBox');

/**
 * 块内容操作
 * */
const activeIndex = ref(-1); // 需激活的块内容索引

// 更新块内容
const refreshPointBox = inject<any>('refreshPointBox');
const updateContentHandle = async (newValue: UpdatePointDTO) => {
    const target = props.item.content[activeIndex.value];
    await api.point.update(target.id, newValue).then(() => {
        // 简易刷新
        target.name = newValue.name;
        target.content = newValue.content;
        refreshPointBox(); // 刷新知识点列表
    });
    activeIndex.value = -1;
};

// 改变块内容顺序
const changeOrderHandle = async () => {
    // 改变块顺序(以后看看能不能一次性改)
    for (let i = 0; i < props.item.content.length; i++) {
        const point = props.item.content[i];
        await api.chunkContent
            .upsert({ chunkId: props.item.id, order: i, pointId: point.id })
            .then(() => {
                // 伪刷新点排序,否则连续新增会乱序
                props.item.content[i].order = i;
            });
    }
    // 改变知识块更新时间
    await api.chunk.updateTime(props.item.id);
    // 刷新知识块加工区
    refreshChunkBox();
};

/**
 * 节点操作
 * */
const emit = defineEmits(['active', 'blur', 'add', 'create', 'delete']);

// 编辑前处理
const newValue = ref({ name: '', preface: '', endnote: '' }); // 新值
const editTarget = ref('name'); // 编辑目标
const editStartHandle = (target: 'name' | 'preface' | 'endnote') => {
    emit('active');
    // 同步值
    newValue.value.name = props.item.name;
    newValue.value.preface = props.item.preface;
    newValue.value.endnote = props.item.endnote;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识块名', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.name === props.item.name &&
        newValue.value.preface === props.item.preface &&
        newValue.value.endnote === props.item.endnote
    )
        return emit('blur');

    // 调用新增或更新方法
    if (props.item.id === -1) create();
    else update();

    emit('blur');
};

// 更新节点
const update = async () => {
    await api.chunk.update(props.item.id, newValue.value).then(() => {
        // 刷新
        props.item.name = newValue.value.name;
        props.item.preface = newValue.value.preface;
        props.item.endnote = newValue.value.endnote;
        refreshChunkBox();
    });
};

// 创建节点
const create = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识块名', 'text')) return;

    await api.chunk.create(newValue.value).then((res) => {
        props.item.id = res.data.id;
        refreshChunkBox(); // 刷新知识块加工区
        emit('create');
    });
};

// 新增子节点
const childNodesRef = ref<any>(null);
const addChildNodeHandle = () => {
    if (childNodesRef.value) childNodesRef.value.addNodeHandle(0);
};
</script>

<template>
    <card-fold class="mt-[5px] mb-[5px]">
        <template #title>
            <title-level :level="props.item.level">
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit && editTarget === 'name'"
                    placeholder="请输入知识块名"
                    class="title !w-[200px]"
                    @editStart="editStartHandle('name')"
                    @changeValue="newValue.name = $event"
                    @editEnd="editEndHandle"
                ></edit-item>
            </title-level>
            <!-- 拖拽手柄 -->
            <div class="drag-handle">&nbsp;</div>
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
                    @click="$emit('delete')"
                />
            </div>
        </template>

        <!-- 节点主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 节点前言 -->
            <div class="preface !py-1 !mt-3 mb-1">
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit && editTarget === 'preface'"
                    placeholder="请输入知识块前言"
                    @editStart="editStartHandle('preface')"
                    @changeValue="newValue.preface = $event"
                    @editEnd="editEndHandle"
                ></edit-item>
            </div>

            <!-- 块内容列表 -->
            <div class="node-content mb-2">
                <drag-list
                    :list="props.item.content"
                    item-key="order"
                    group="point"
                    v-slot="drag"
                    @update="changeOrderHandle"
                >
                    <chunk-content
                        v-show="!drag.item.isDel"
                        :item="drag.item"
                        :isEdit="activeIndex === drag.index"
                        @active="activeIndex = drag.index"
                        @blur="activeIndex = -1"
                        @update="updateContentHandle"
                    ></chunk-content>
                </drag-list>
                <add-line-two
                    topText="新增块内容"
                    bottonText="新增节点"
                    @addBotton="addChildNodeHandle"
                ></add-line-two>
            </div>

            <!-- 子节点列表 -->
            <tree-node-list
                :treeId="props.treeId"
                :parentNodeId="props.item.node?.id || -1"
                :deep="props.item.level?.deep || 1"
                :parentPrefix="props.item.level?.prefix || ''"
                :nodes="props.item.node?.children || []"
                ref="childNodesRef"
            ></tree-node-list>

            <!-- 节点尾注 -->
            <div class="endnote mt-[5px]">
                <edit-item
                    :value="props.item.endnote"
                    :isEdit="props.isEdit && editTarget === 'endnote'"
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
