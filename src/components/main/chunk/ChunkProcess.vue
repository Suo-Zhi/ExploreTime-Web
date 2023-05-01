<script setup lang="ts">
import { Chunk, SortChunk } from '@/api/chunk/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortChunk>(store.setting().sort.chunk);
const sortOptions = [
    { label: '创建时间', value: 'createTime' },
    { label: '更新时间', value: 'updateTime' },
];

// 筛选
const filter = ref('');
const filterOptions = [
    { label: '全部', value: 'all' },
    { label: '待整理', value: '' },
    { label: '已整理', value: 'true' },
];

const list = ref<Chunk[]>([]);
const keywords = ref('');
</script>

<template>
    <common-box class="chunk-process" :isLoad="isLoad">
        <!-- 知识块列表 -->
        <chunk-item v-for="(item, index) of list" :key="index" :item="item"></chunk-item>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="chunk"
                cacheKey="chunk"
            ></select-sort>
            <select-type
                v-model="filter"
                :options="filterOptions"
                class="!w-[65px] ml-4"
            ></select-type>
        </template>

        <template #navRight>
            <search-bar v-model="keywords"></search-bar>
            <add-button title="新增知识点"></add-button>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
