<script setup lang="ts">
interface Props {
    isLoad: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div class="relative">
        <slot></slot>
        <!-- 加载图标 -->
        <div v-if="props.isLoad" class="absolute w-full top-1/2 -translate-y-1/2 text-center py-2">
            <a-spin dot />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
