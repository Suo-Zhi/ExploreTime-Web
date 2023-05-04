<script setup lang="ts">
import { Tree } from '@/api/tree/types';

interface Props {
    item: Tree;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

// 移除
const removeHandle = async () => {
    await api.tree.remove(props.item.id).then(() => {
        props.item.isDel = true;
    });
};

// 公开
const togglePublicHandle = async () => {
    await api.tree.togglePublic(props.item.id, !props.item.isPublic).then(() => {
        props.item.isPublic = !props.item.isPublic;
    });
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
            <!-- 顶部操作栏 -->
            <section class="action-bar">
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联项"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                />
                <icon-notes
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看树详情"
                />
                <lock-button
                    :isPublic="props.item.isPublic"
                    @click="togglePublicHandle"
                ></lock-button>
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识树前言 -->
            <div class="preface bg-slate-50 border-l-4 border-secondary px-2 rounded-sm">
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit"
                    placeholder="请输入知识点内容"
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
                <icon-delete
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-red-600"
                    title="删除"
                    @click="removeHandle"
                />
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
