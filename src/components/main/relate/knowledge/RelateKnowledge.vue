<script setup lang="ts">
interface Props {
    type: 'point' | 'chunk' | 'tree'; // 需要展示的知识类型
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="relate-knowledge h-full px-2">relate-knowledge {{ props.type }}</section>
</template>

<style lang="scss" scoped></style>
