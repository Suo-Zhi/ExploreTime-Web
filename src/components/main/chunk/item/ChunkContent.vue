<script setup lang="ts">
import { ChunkContent } from '@/api/chunk/types';

interface Props {
    item: ChunkContent;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="chunk-content-item">
        <card-fold class="px-1" :line="false">
            <template #title>
                <div class="title py-1 text-[14px]">{{ props.item.name }}</div>
            </template>

            <template #actions>
                <div class="action-bar mr-2">
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
                    <icon-reduce
                        size="16"
                        :strokeWidth="3"
                        class="cursor-pointer hover:text-red-600"
                        title="移出"
                    />
                </div>
            </template>

            <div class="point-content border-t text-[14px] mx-2 py-1">
                {{ props.item.content }}
            </div>
        </card-fold>

        <add-line></add-line>
    </section>
    <!-- 知识块内容项 -->
</template>

<style lang="scss" scoped></style>
