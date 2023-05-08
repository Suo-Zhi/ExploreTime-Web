<script setup lang="ts">
import { Chunk } from '@/api/chunk/types';

interface Props {
    item: Chunk;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '块关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'chunk',
    });
};
</script>
<template>
    <!-- 知识块 -->
    <card-fold class="mb-3" :isToggle="false">
        <!-- 标题 -->
        <template #title>
            <!-- 知识块名 -->
            <text-view :text="props.item.name" class="my-1" />
        </template>

        <!-- 顶部操作栏 -->
        <template #actions>
            <div class="action-bar mr-2">
                <icon-link-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'chunk')"
                />
            </div>
        </template>

        <!-- 知识块主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 知识块前言 -->
            <div
                class="preface ml-2 py-1 pl-1 rounded-sm relative bg-gradient-to-r from-slate-50 to-blue-50"
            >
                <text-view :text="props.item.preface" />
            </div>

            <!-- 知识块内容列表 -->
            <div class="content my-1">
                <chunk-content-view
                    v-for="(item, index) of props.item.content"
                    :key="index"
                    :item="item"
                    v-show="!item.isDel"
                ></chunk-content-view>
            </div>

            <!-- 知识块尾注 -->
            <div
                class="endnote ml-2 py-1 pl-1 rounded-sm relative bg-gradient-to-r from-slate-50 to-slate-100"
            >
                <text-view :text="props.item.endnote" />
            </div>
        </div>

        <!-- 知识块项底部 -->
        <div class="chunk-footer flex justify-between items-center ml-3 mb-2">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>
        </div>
    </card-fold>
</template>

<style lang="scss" scoped></style>
