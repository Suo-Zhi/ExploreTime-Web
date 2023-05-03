<script setup lang="ts">
interface Props {
    text?: string;
}
const props = withDefaults(defineProps<Props>(), {
    text: '暂无数据',
});
</script>

<template>
    <section class="empty w-full h-full relative">
        <a-empty class="absolute top-1/2 -translate-y-[85%]">
            {{ props.text }}
        </a-empty>
    </section>
</template>

<style lang="scss" scoped></style>
