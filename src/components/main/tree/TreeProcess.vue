<script setup lang="ts">
import { SortTree, Tree } from '@/api/tree/types';

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

// 查
const list = ref<Tree[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.tree
        .findMy({ keywords: keywords.value, sort: sort.value })
        .then((res) => {
            list.value = res.data;
        })
        .finally(() => {
            isLoad.value = false;
        });
};
onMounted(() => {
    findList();
});
defineExpose({
    findList,
});

const activeIndex = ref(-1);
</script>

<template>
    <common-box class="tree-process pb-[6px]" :isLoad="isLoad">
        <!-- 知识树列表 -->
        <tree-item
            v-for="(item, index) of list"
            :key="index"
            :item="item"
            :isEdit="activeIndex === index"
            v-show="!item.isDel && (item.isPublic === Boolean(filter) || filter === 'all')"
        ></tree-item>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="tree"
                cacheKey="tree"
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
            <add-button title="新增知识树"></add-button>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
