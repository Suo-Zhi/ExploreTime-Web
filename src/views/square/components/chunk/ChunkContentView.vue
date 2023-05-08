<script setup lang="ts">
import { ChunkContent } from '@/api/chunk/types';

interface Props {
    item: ChunkContent;
}
const props = withDefaults(defineProps<Props>(), {});
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
                        title="查看关联项"
                    />
                    <icon-comment
                        size="17"
                        :strokeWidth="3"
                        class="action-btn hover:text-primary"
                        title="查看反馈"
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
