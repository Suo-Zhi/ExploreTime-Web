<script setup lang="ts">
import { SettingState } from '@/store/setting/types';
import { CacheKey } from '@/types/cacheKey';

interface Props {
    modelValue: any;
    options: SelectOption[];
    cacheKey?: CacheKey;
    storeKey?: keyof SettingState;
}

interface SelectOption {
    label: string;
    value: any;
}

const props = withDefaults(defineProps<Props>(), {});

// 切换选项 & 持久化存储
const emit = defineEmits(['update:modelValue']);
const changeHandle = (e: any) => {
    emit('update:modelValue', e);
    if (props.storeKey) store.setting()[props.storeKey] = e as never;
    if (props.cacheKey) localCache.set(props.cacheKey, e);
};
</script>

<template>
    <!-- 类型选择器 -->
    <a-select
        :model-value="props.modelValue"
        @change="changeHandle"
        size="small"
        class="type-selector !w-[100px]"
        :bordered="false"
    >
        <a-option v-for="(option, index) of props.options" :key="index" :value="option.value">
            {{ option.label }}
        </a-option>
    </a-select>
</template>

<style lang="scss" scoped></style>
