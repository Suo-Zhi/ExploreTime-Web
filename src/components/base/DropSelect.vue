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

const emit = defineEmits(['update:modelValue']);
const changeHandle = (e: any) => {
    // 同步值
    emit('update:modelValue', e);
    // 持久化存储
    if (props.storeKey) store.setting()[props.storeKey] = e;
    if (props.cacheKey) localCache.set(props.cacheKey, e);
};
</script>

<template>
    <a-select
        :model-value="props.modelValue"
        @change="changeHandle"
        size="small"
        class="!w-[100px]"
        :bordered="false"
    >
        <a-option v-for="(option, index) of props.options" :key="index" :value="option.value">
            {{ option.label }}
        </a-option>
    </a-select>
</template>

<style lang="scss" scoped></style>
