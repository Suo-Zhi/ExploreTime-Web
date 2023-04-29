<script setup lang="ts">
interface Props {
    title: string;
}
const props = withDefaults(defineProps<Props>(), {
    title: '新增',
});
</script>

<template>
    <!-- 新增按钮 -->
    <a-button type="primary" size="mini" :title="props.title" class="ml-2">
        <template #icon>
            <icon-plus />
        </template>
    </a-button>
</template>

<style lang="scss" scoped></style>
