<script setup lang="ts">
import { Point, SortPoint } from '@/api/point/types';
import * as icons from '@icon-park/vue-next';

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
        <section
            v-for="(item, index) in list"
            :key="index"
            class="border border-gray-200 rounded-sm p-3 pb-2 mb-2 hover:shadow-md duration-300"
        >
            <!-- 知识点名 -->
            <div class="point-name">{{ item.name }}</div>
            <!-- 知识点内容 -->
            <div v-html="item.content"></div>

            <!-- 卡片底部 -->
            <div class="card-footer flex justify-between items-center mt-[4px]">
                <time-bar :createTime="item.createTime" :updateTime="item.updateTime"></time-bar>
                <!-- 操作项 -->
                <section class="action-bar">
                    <icon-link
                        size="17"
                        :strokeWidth="3"
                        class="action-btn hover:text-primary"
                        title="查看关联项"
                    />
                    <component
                        :is="item.isRefine ? icons['InboxOut'] : icons['InboxIn']"
                        size="17"
                        :strokeWidth="3"
                        :title="item.isRefine ? '还需处理' : '处理完成'"
                        class="action-btn hover:text-primary"
                    ></component>
                    <icon-delete
                        size="17"
                        :strokeWidth="3"
                        class="action-btn hover:text-red-600"
                        title="删除"
                    />
                </section>
            </div>
        </section>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="info"
                cacheKey="info"
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
