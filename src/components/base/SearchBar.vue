<script setup lang="ts">
interface Props {
    modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {});

let isFold = ref(true); // 是否展开
</script>

<template>
    <!-- 搜索框 -->
    <a-input
        allow-clear
        placeholder="按 Enter 搜索"
        class="h-[24px] !bg-white !px-0 !border-0 !border-b !rounded-none"
        :class="isFold ? '!w-[16px]' : '!w-[150px]'"
        :model-value="props.modelValue"
        @input="$emit('update:modelValue', $event)"
        @keyup.enter="$emit('search')"
        @clear="
            $emit('update:modelValue', '');
            $emit('search');
        "
        @blur="$event.target?.value ? '' : (isFold = true)"
        @focus="isFold = false"
    >
        <template #prefix>
            <icon-search class="cursor-pointer" />
        </template>
    </a-input>
</template>

<style lang="scss" scoped></style>
