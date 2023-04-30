<script setup lang="ts">
interface Props {
    modelValue: any;
    options: SelectOption[];
}

export interface SelectOption {
    label: string;
    value: any;
}

const props = withDefaults(defineProps<Props>(), {});

// 切换选项
const emit = defineEmits(['update:modelValue']);
const changeHandle = (e: any) => {
    emit('update:modelValue', e);
};
</script>

<template>
    <!-- 类型选择器 -->
    <a-select
        :model-value="props.modelValue"
        @change="changeHandle"
        size="small"
        class="type-selector !w-[100px] !p-0"
        :bordered="false"
    >
        <a-option v-for="(option, index) of props.options" :key="index" :value="option.value">
            {{ option.label }}
        </a-option>
    </a-select>
</template>

<style lang="scss" scoped></style>
