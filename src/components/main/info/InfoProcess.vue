<script setup lang="ts">
const isLoad = ref(false);
const isFoldNav = ref(false);

// 排序
const sort = ref({
    key: 'createTime',
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
const findList = (keywords: string) => {
    isLoad.value = true;
    setTimeout(() => {
        console.log(keywords);
        isLoad.value = false;
    }, 1000);
};
findList('');

// 增
const addHandle = (info: string) => {
    console.log(info);
};
</script>

<template>
    <section class="info-process absolute w-full h-full">
        <load-box class="h-full" :isLoad="isLoad">
            <!-- 局部导航 -->
            <section-nav v-model="isFoldNav">
                <!-- 左侧 -->
                <div class="flex items-center">
                    <select-sort
                        v-model="sort.key"
                        v-model:order="sort.order"
                        :options="sortOptions"
                    ></select-sort>
                    <select-type v-model="filter" :options="filterOptions"></select-type>
                </div>

                <!-- 右侧 -->
                <div class="items-center flex">
                    <!-- 搜索 -->
                    <search-bar @search="findList"></search-bar>
                </div>
            </section-nav>

            <!-- 主体列表 -->
            <div class="h-full duration-300" :class="isFoldNav ? 'pt-[1px]' : 'pt-[30px]'">
                <scroll-bar>
                    <!-- 信息项 -->
                    <section
                        class="info-item w-full h-[100px] bg-pink-200 mb-2"
                        v-for="i in 10"
                        :key="i"
                    ></section>
                </scroll-bar>
            </div>

            <!-- 新增信息栏 -->
            <input-info-bar @addInfo="addHandle"></input-info-bar>
        </load-box>
    </section>
</template>

<style lang="scss" scoped></style>
