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

// 查
const list = ref<Point[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;
    const res = await api.point.findMy({ keywords: keywords.value, sort: sort.value });
    list.value = res.data;
    isLoad.value = false;
};
onMounted(() => {
    findList();
});
</script>

<template>
    <common-box class="point-process" :isLoad="isLoad">
        <!-- 知识点列表 -->
        <point-item
            v-for="(item, index) of list"
            :key="index"
            :item="item"
            :isEdit="{ name: false, content: false }"
            v-show="!item.isDel && (item.isRefine === Boolean(filter) || filter === 'all')"
        ></point-item>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="point"
                cacheKey="point"
                @change="findList"
            ></select-sort>
            <select-type
                v-model="filter"
                :options="filterOptions"
                class="!w-[65px] ml-4"
            ></select-type>
        </template>

        <template #navRight>
            <search-bar v-model="keywords" @search="findList"></search-bar>
            <add-button title="新增知识点"></add-button>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
