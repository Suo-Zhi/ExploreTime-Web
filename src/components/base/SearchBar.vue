<script setup lang="ts">
interface Props {
    modelValue: string; // 搜索关键字
}
const props = withDefaults(defineProps<Props>(), {});

const isFold = ref(true); // 是否展开搜索栏
</script>

<template>
    <!-- 搜索框 -->
    <a-input
        allow-clear
        placeholder="按 Enter 搜索"
        class="search-bar h-[24px] !bg-white !px-0 !border-0 !border-b !rounded-none"
        :class="isFold ? '!w-[16px]' : '!w-[150px]'"
        :model-value="props.modelValue"
        @input="$emit('update:modelValue', $event)"
        @keyup.enter="$emit('search')"
        @clear="
            $emit('update:modelValue', '');
            $emit('search', '');
        "
        @blur="props.modelValue ? '' : (isFold = true)"
        @focus="isFold = false"
    >
        <template #prefix>
            <icon-search class="cursor-pointer" />
        </template>
    </a-input>
</template>

<style lang="scss" scoped>
.search-bar {
    ::v-deep .arco-input-icon-hover:hover {
        color: $color-primary;
    }
    ::v-deep .arco-input-icon-hover:hover::before {
        background-color: transparent;
    }
}
</style>
