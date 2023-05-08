<script setup lang="ts">
import { Tree } from '@/api/tree/types';

interface Props {
    item: Tree;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 打开树详情
const viewTreeDetail = () => {
    store.square().addHistoryLink({
        linkType: 'treeDetail',
        linkTitle: '树详情-' + props.item.name,
        targetId: props.item.id,
        targetType: 'tree',
    });
};

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '树关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'tree',
    });
};
</script>

<template>
    <!-- 知识点项 -->
    <section class="tree-item border-base flex flex-col pt-[4px] pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识树名 -->
            <div class="tree-title min-w-[170px]">
                <text-view :text="props.item.name"></text-view>
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
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'tree')"
                />
            </section>
        </div>

        <!-- 主体 -->
        <div class="body cursor-pointer pl-1 pr-2" @click="viewTreeDetail">
            <!-- 知识树前言 -->
            <div class="preface my-2 px-3">
                <text-view :text="props.item.preface"></text-view>
            </div>

            <!-- 尾部 -->
            <div class="card-footer flex justify-between items-center ml-2">
                <time-bar
                    :createTime="props.item.createTime"
                    :updateTime="props.item.updateTime"
                ></time-bar>
                <!-- 内容统计 -->
                <div class="flex items-center">
                    <a-tag color="blue" size="small" class="mr-[6px] select-none">
                        知识块 {{ props.item.chunkTotal }}
                    </a-tag>
                    <a-tag color="cyan" size="small" class="select-none">
                        知识点 {{ props.item.pointTotal }}
                    </a-tag>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
