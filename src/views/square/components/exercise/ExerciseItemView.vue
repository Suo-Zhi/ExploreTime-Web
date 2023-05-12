<script setup lang="ts">
import { Exercise } from '@/api/exercise/types';

interface Props {
    item: Exercise;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '习题关联-' + props.item.question,
        targetId: props.item.id,
        targetType: 'exercise',
    });
};
</script>

<template>
    <!-- 习题项 -->
    <section class="exercise-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 习题名 -->
            <div class="exercise-title min-w-[170px]">
                <text-view :text="props.item.question"></text-view>
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
        <div class="card-body exercise-content my-2">
            <!-- 问题详情 -->
            <div class="preface mr-2">
                <text-view :text="props.item.detail"></text-view>
            </div>

            <!-- 参考回答 -->
            <card-fold :default="true" :line="false" :border="false">
                <template #title>
                    <span class="my-2 text-slate-700">参考回答</span>
                </template>
                <div class="pl-[26px]">
                    <text-view :text="props.item.answer"></text-view>
                </div>
            </card-fold>

            <!-- 习题解析 -->
            <card-fold :default="true" :line="false" :border="false">
                <template #title>
                    <span class="my-2 text-slate-700">习题解析</span>
                </template>
                <div class="pl-[26px]">
                    <text-view :text="props.item.analysis"></text-view>
                </div>
            </card-fold>
        </div>

        <!-- 尾部 -->
        <div class="card-footer flex justify-between px-3">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
