<script setup lang="ts">
import draggable from 'vuedraggable';

interface Props {
    list: Array<any>;
    group: string;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <draggable
        :list="props.list"
        :group="props.group"
        handle=".drag-handle"
        ghostClass="ghost"
        animation="200"
        item-key="id"
        :scroll-sensitivity="150"
        :force-fallback="true"
        scrollSpeed="20"
    >
        <template #item="{ element: item, index }">
            <div>
                <slot :item="item" :index="index"></slot>
            </div>
        </template>
    </draggable>
</template>

<style lang="scss" scoped></style>
