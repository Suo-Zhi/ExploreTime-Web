<script setup lang="ts">
interface Props {
    text?: string;
}
const props = withDefaults(defineProps<Props>(), {
    text: '暂无数据',
});
</script>

<template>
    <a-empty class="empty absolute top-1/2 -translate-y-[85%]">
        {{ props.text }}
    </a-empty>
</template>

<style lang="scss" scoped></style>
