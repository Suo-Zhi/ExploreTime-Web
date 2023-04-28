<script setup lang="ts">
import { Info, SortInfo } from '@/api/info/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortInfo>({
    field: 'createTime',
    order: 'desc',
});
const sortOptions = [
    { label: '创建时间', value: 'createTime' },
    { label: '更新时间', value: 'updateTime' },
];

// 筛选
const filter = ref('false');
const filterOptions = [
    {
        label: '全部',
        value: 'all',
    },
    {
        label: '待整理',
        value: 'false',
    },
    {
        label: '已整理',
        value: 'true',
    },
];

// 查
const list = ref<Info[]>([]);
const findList = async (keywords: string) => {
    isLoad.value = true;
    const res = await api.info.findMy({ keywords, sort: sort.value });
    list.value = res.data;
    console.log(list.value);

    isLoad.value = false;
};
findList('');

// 增
const addHandle = (info: string) => {
    console.log(info);
};
</script>

<template>
    <common-box class="info-process" :isLoad="isLoad">
        <!-- 信息列表 -->
        <section
            class="info-item w-full h-[100px] bg-pink-200 mb-2"
            v-for="i in 10"
            :key="i"
        ></section>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                @change="findList"
            ></select-sort>
            <select-type
                v-model="filter"
                :options="filterOptions"
                class="!w-[65px] ml-4"
            ></select-type>
        </template>

        <template #navRight>
            <search-bar @search="findList"></search-bar>
        </template>

        <template #extra>
            <!-- 新增信息栏 -->
            <input-info-bar @addInfo="addHandle"></input-info-bar>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
