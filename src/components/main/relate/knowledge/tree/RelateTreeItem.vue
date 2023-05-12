<script setup lang="ts">
import { Tree } from '@/api/tree/types';

interface Props {
    item: Tree;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

const emit = defineEmits(['refresh']);

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '树关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'tree',
    });
    switchHistory('relateDetail');
};

// 取消关联
const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const cancelRelate = async (id: number) => {
    await api.relate
        .delRelate({
            targetId: targetId.value,
            targetType: targetType.value,
            relateId: id,
            relateType: 'tree',
        })
        .then(() => {
            emit('refresh');
        });
};

// 打开树详情
const viewDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'treeDetail',
        linkTitle: '树详情-' + props.item.name,
        targetId: props.item.id,
        targetType: 'tree',
    });
    switchHistory('treeDetail');
};
</script>

<template>
    <!-- 知识点项 -->
    <section class="tree-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识树名 -->
            <div class="tree-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit"
                    placeholder="请输入知识树名"
                ></edit-item>
            </div>
            <!-- 拖拽手柄 -->
            <div class="drag-handle">&nbsp;</div>
            <!-- 顶部操作栏 -->
            <section class="action-bar">
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联项"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'tree')"
                />
                <icon-notes
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看树详情"
                    @click="viewDetail"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识树前言 -->
            <div class="preface bg-slate-50 border-l-4 border-secondary px-2 rounded-sm">
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit"
                    placeholder="请输入知识树前言"
                ></edit-item>
            </div>
        </div>

        <!-- 尾部 -->
        <div class="card-footer flex justify-between items-center px-3">
            <!-- 内容统计 -->
            <div class="flex items-center">
                <a-tag color="blue" size="small" class="mr-[6px] select-none">
                    知识块 {{ props.item.chunkTotal }}
                </a-tag>
                <a-tag color="cyan" size="small" class="select-none">
                    知识点 {{ props.item.pointTotal }}
                </a-tag>
            </div>
            <!-- 底部操作栏 -->
            <section class="action-bar">
                <icon-unlink
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="取消关联"
                    @click="cancelRelate(item.id)"
                />
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
