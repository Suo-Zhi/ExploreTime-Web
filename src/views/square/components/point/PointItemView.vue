<script setup lang="ts">
import { Point } from '@/api/point/types';

interface Props {
    item: Point;
}
const props = withDefaults(defineProps<Props>(), {});

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '点关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'point',
    });
};

const { openDiscussArea } = store.square(); // 打开讨论区
</script>
<template>
    <!-- 知识点项 -->
    <section
        class="point-item flex flex-col border border-gray-200 rounded-sm pt-2 pb-2 mb-2 hover:shadow-md duration-300"
    >
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识点名 -->
            <div class="point-title min-w-[170px]">
                <text-view :text="props.item.name" />
            </div>
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
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看反馈"
                    @click="openDiscussArea(item.id, 'point')"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识点内容 -->
            <text-view :text="props.item.content" />
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
