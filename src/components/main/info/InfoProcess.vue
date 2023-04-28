<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { Info, SortInfo } from '@/api/info/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortInfo>({
    field: store.setting().sort.field.info,
    order: store.setting().sort.order.info,
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
const list = ref<Info[]>([]);
const findList = async (keywords: string = '') => {
    isLoad.value = true;
    const res = await api.info.findMy({ keywords, sort: sort.value });
    list.value = res.data;
    isLoad.value = false;
};
onMounted(() => {
    findList();
});

// 移除
const removeHandle = async (index: number) => {
    const target = list.value[index];
    await api.info.remove(target.id);
    target.isDel = true;
};

// 归档
const toggleRefineHandle = async (index: number) => {
    const target = list.value[index];
    await api.info.toggleRefine(target.id, !target.isRefine);
    target.isRefine = !target.isRefine;
};
</script>

<template>
    <common-box class="info-process" :isLoad="isLoad">
        <!-- 信息列表 -->
        <section
            v-for="(item, index) of list"
            :key="index"
            class="border border-gray-200 rounded-sm p-3 pb-2 mb-2 hover:shadow-md duration-300"
            v-show="!item.isDel && (item.isRefine === Boolean(filter) || filter === 'all')"
        >
            <!-- 信息内容 -->
            <section
                v-html="item.content"
                class="view-box w-full min-h-[8px] flex items-center leading-[24px]"
            ></section>

            <!-- 卡片底部 -->
            <div class="card-footer flex justify-between items-center mt-[4px]">
                <time-bar :createTime="item.createTime" :updateTime="item.updateTime"></time-bar>
                <!-- 操作项 -->
                <section class="action-bar">
                    <icon-hammer-and-anvil
                        size="17"
                        :strokeWidth="3"
                        class="action-btn hover:text-primary"
                        title="提炼"
                    />
                    <component
                        :is="item.isRefine ? icons['InboxOut'] : icons['InboxIn']"
                        size="17"
                        :strokeWidth="3"
                        :title="item.isRefine ? '还需处理' : '处理完成'"
                        class="action-btn hover:text-primary"
                        @click="toggleRefineHandle(index)"
                    ></component>
                    <icon-delete
                        size="17"
                        :strokeWidth="3"
                        class="action-btn hover:text-red-600"
                        title="删除"
                        @click="removeHandle(index)"
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
            <input-info-bar @refreshList="findList"></input-info-bar>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
