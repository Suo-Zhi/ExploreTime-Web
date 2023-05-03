<script setup lang="ts">
import { SortTree } from '@/api/tree/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortTree>(store.setting().sort.chunk);
const sortOptions = [
    { label: '创建时间', value: 'createTime' },
    { label: '更新时间', value: 'updateTime' },
];

// 筛选
const filter = ref('');
const filterOptions = [
    { label: '全部', value: 'all' },
    { label: '私有', value: '' },
    { label: '公开', value: 'true' },
];
</script>

<template>
    <common-box class="tree-process pb-[6px]" :isLoad="isLoad">
        <!-- 知识树列表 -->

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="tree"
                cacheKey="tree"
            ></select-sort>
            <select-type
                v-model="filter"
                :options="filterOptions"
                class="!w-[65px] ml-4"
            ></select-type>
        </template>

        <template #navRight>
            <add-button title="新增知识树"></add-button>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
