<script setup lang="ts">
import { Point, SortPoint } from '@/api/point/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortPoint>({
    field: store.setting().sort.field.point,
    order: store.setting().sort.order.point,
});
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

const list = ref<Point[]>([
    {
        id: 1,
        name: '6',
        content: '666666666666',
        isRefine: false,
        isDel: false,
        authorId: 'tom',
        createTime: new Date(),
        updateTime: new Date(),
    },
]);
const keywords = ref('');
</script>

<template>
    <common-box class="point-process" :isLoad="isLoad">
        <!-- 知识点列表 -->
        <point-item
            v-for="(item, index) of list"
            :key="index"
            :item="item"
            :isEdit="{ name: false, content: false }"
        ></point-item>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="point"
                cacheKey="point"
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
