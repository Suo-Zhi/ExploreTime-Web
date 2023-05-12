<script setup lang="ts">
import { Exercise } from '@/api/exercise/types';
interface Props {
    item: Exercise;
}
const props = withDefaults(defineProps<Props>(), {});

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '习题关联-' + props.item.question,
        targetId: props.item.id,
        targetType: 'exercise',
    });
};

const { openDiscussArea } = store.square(); // 打开讨论区
</script>

<template>
    <!-- 习题项 -->
    <section class="exercise-item border-base flex flex-col pt-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 习题名 -->
            <div class="exercise-title min-w-[170px]">
                <text-view :text="props.item.question" />
            </div>
            <!-- 顶部操作栏 -->
            <section class="action-bar">
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'exercise')"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body exercise-content mt-2 mb-1">
            <!-- 问题详情 -->
            <div class="preface mr-2">
                <text-view :text="props.item.detail" />
            </div>

            <!-- 参考回答 -->
            <card-fold :default="true" :line="false" :border="false">
                <template #title>
                    <span class="my-2 text-slate-700">参考回答</span>
                </template>
                <div class="pl-[26px]">
                    <text-view :text="props.item.answer" />
                </div>
            </card-fold>

            <!-- 习题解析 -->
            <card-fold :default="true" :line="false" :border="false">
                <template #title>
                    <span class="my-2 text-slate-700">习题解析</span>
                </template>
                <div class="pl-[26px]">
                    <text-view :text="props.item.analysis" />
                </div>
            </card-fold>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
