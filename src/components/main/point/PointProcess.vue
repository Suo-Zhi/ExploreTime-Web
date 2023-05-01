<script setup lang="ts">
import { UpdatePointDTO } from '@/api/point/dto';
import { Point, SortPoint } from '@/api/point/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortPoint>(store.setting().sort.point);
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

    await api.point
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

// 更新
const activeIndex = ref(-1);
const updateHandle = async (newValue: UpdatePointDTO) => {
    const target = list.value[activeIndex.value];
    await api.point.updateBody(target.id, newValue).then(() => {
        // 处于搜索中则刷新列表，反之简易处理
        if (keywords.value) findList();
        else {
            target.name = newValue.name;
            target.content = newValue.content;
        }
    });
    activeIndex.value = -1;
};

// 点击新增按钮
const clickAddHandle = () => {
    // 列表顶部插入空白项
    list.value.unshift({
        id: -1,
        name: '',
        content: '',
        isRefine: false,
        isDel: false,
        authorId: store.user().userinfo?.id || '',
        createTime: new Date(),
        updateTime: new Date(),
    });
    // 激活新空白项
    activeIndex.value = 0;
};
</script>

<template>
    <common-box class="point-process" :isLoad="isLoad">
        <!-- 知识点列表 -->
        <point-item
            v-for="(item, index) of list"
            :key="index"
            :item="item"
            :isEdit="activeIndex === index"
            @active="activeIndex = index"
            @blur="activeIndex = -1"
            @update="updateHandle"
            @refresh="findList"
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
            <add-button title="新增知识点" @click="clickAddHandle"></add-button>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
