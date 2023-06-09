<script setup lang="ts">
import { Info, SortInfo } from '@/api/info/types';

const isLoad = ref(false);

const isShowRefineModel = ref(false); // 是否显示提炼框
const refineItem = ref<Info>();

// 排序
const sort = ref<SortInfo>(store.setting().sort.info);
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
const list = ref<Info[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;
    await api.info
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

// 更新内容
const activeIndex = ref(-1); // 激活目标索引
const updateHandle = async (value: any) => {
    const target = list.value[activeIndex.value];
    await api.info.updateContent(target.id, { content: value }).then(() => {
        if (keywords.value) findList();
        else target.content = value;
    });
    activeIndex.value = -1;
};
</script>

<template>
    <common-box class="info-process" :isLoad="isLoad">
        <!-- 有效信息列表 -->
        <info-item
            v-for="(item, index) of list"
            :key="index"
            :item="item"
            :isEdit="activeIndex === index"
            @active="activeIndex = index"
            @blur="activeIndex = -1"
            @update="updateHandle"
            @refine="
                refineItem = item;
                isShowRefineModel = true;
            "
            v-show="!item.isDel && (item.isRefine === Boolean(filter) || filter === 'all')"
        ></info-item>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="info"
                cacheKey="info"
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
        </template>

        <template #extra>
            <!-- 新增信息栏 -->
            <add-info-bar @refreshList="findList"></add-info-bar>
            <!-- 有效信息提炼框 -->
            <refine-info-modal
                v-if="refineItem"
                v-model:isShow="isShowRefineModel"
                :id="refineItem.id"
                v-model:content="refineItem.content"
                @refresh="findList"
            ></refine-info-modal>
        </template>
    </common-box>
</template>

<style lang="scss" scoped>
.info-process {
    ::v-deep .main-list {
        padding-bottom: 60px;
    }
}
</style>
