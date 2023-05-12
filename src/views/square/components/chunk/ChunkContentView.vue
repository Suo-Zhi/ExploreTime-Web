<script setup lang="ts">
import { ChunkContent } from '@/api/chunk/types';

interface Props {
    item: ChunkContent;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '点关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'point',
    });
};
</script>

<template>
    <!-- 知识块内容项 -->
    <section class="chunk-content-item">
        <card-fold :line="false" :border="false">
            <template #title>
                <text-view :text="props.item.name" />
            </template>

            <template #actions>
                <div class="action-bar">
                    <icon-link-one
                        size="16"
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
                        @click="openDiscussArea(item.id, 'point')"
                    />
                </div>
            </template>

            <div class="point-content border-t text-[14px] mx-2 py-1">
                <text-view :text="props.item.content" />
            </div>
        </card-fold>
    </section>
</template>

<style lang="scss" scoped></style>
