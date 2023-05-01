<script setup lang="ts">
import { Section } from '@/store/setting/types';
import * as icons from '@icon-park/vue-next';

interface Props {
    modelValue: string; // 排序项
    order: 'asc' | 'desc'; // 排序顺序
    options: SelectOption[]; // 可选排序项
    storeKey?: Section;
    cacheKey?: Section;
}

interface SelectOption {
    label: string;
    value: any;
}

const props = withDefaults(defineProps<Props>(), {});

// 动态获取显示标签
const label = computed(() => {
    const index = props.options.findIndex((option) => {
        return option.value === props.modelValue;
    });
    return props.options[index].label;
});

const emit = defineEmits(['update:modelValue', 'update:order', 'change']);

// 切换排序项
const changeValueHandle = (e: any) => {
    // 同步值
    emit('update:modelValue', e);
    // 触发变动事件
    emit('change');
    // 持久化存储
    if (props.storeKey) store.setting().sort[props.storeKey].field = e;
    if (props.cacheKey) {
        let sort = store.setting().sort;
        sort[props.cacheKey].field = e;
        localCache.set('sort', sort);
    }
};

// 切换排序规则
const changeOrderHandle = () => {
    // 同步值
    const newOrder = props.order === 'asc' ? 'desc' : 'asc';
    emit('update:order', props.order === 'asc' ? 'desc' : 'asc');
    // 触发变动事件
    emit('change');
    // 持久化存储
    if (props.storeKey) store.setting().sort[props.storeKey].order = newOrder;
    if (props.cacheKey) {
        let sort = store.setting().sort;
        sort[props.cacheKey].order = newOrder;
        localCache.set('sort', sort);
    }
};
</script>

<template>
    <!-- 排序选择器 -->
    <section class="sort-selector flex items-center">
        <div class="flex cursor-pointer select-none relative h-[30px] items-center">
            <component
                :is="props.order === 'asc' ? icons['SortAmountUp'] : icons['SortAmountDown']"
                size="17"
                :strokeWidth="3"
                :title="props.order === 'asc' ? '升序' : '降序'"
                class="text-gray-900"
                @click="changeOrderHandle"
            ></component>

            <!-- 盖住原label -->
            <div @click="changeOrderHandle" class="absolute bg-white top-[7px] left-[21px] z-10">
                {{ label }}
            </div>

            <select-type
                class="!w-[75px] !p-0 !relative !z-0 ml-[4px]"
                :model-value="props.modelValue"
                :options="props.options"
                @change="changeValueHandle"
            ></select-type>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
