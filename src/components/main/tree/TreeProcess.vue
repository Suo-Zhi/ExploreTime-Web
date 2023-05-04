<script setup lang="ts">
import { UpdateTreeDTO } from '@/api/tree/dto';
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

// 更新
const activeIndex = ref(-1);
const updateHandle = async (newValue: UpdateTreeDTO) => {
    const target = list.value[activeIndex.value];
    await api.tree.update(target.id, newValue).then(() => {
        // 处于搜索中则刷新列表，反之简易处理
        if (keywords.value) findList();
        else {
            target.name = newValue.name;
            target.preface = newValue.preface;
        }
    });
    activeIndex.value = -1;
};

// 点击新增按钮
const clickAddHandle = () => {
    // 切换至非已整理列表
    if (filter.value === 'true') filter.value = '';
    // 列表顶部插入空白项
    list.value.unshift({
        id: -1,
        name: '',
        preface: '',
        isPublic: false,
        isDel: false,
        authorId: store.user().userinfo?.id || '',
        createTime: new Date(),
        updateTime: new Date(),
        chunkTotal: 0,
        pointTotal: 0,
    });
    // 激活新空白项
    activeIndex.value = 0;
};
</script>

<template>
    <common-box class="tree-process pb-[6px]" :isLoad="isLoad">
        <!-- 知识树列表 -->
        <drag-list
            :list="list"
            item-key="id"
            :group="{ name: 'tree', pull: 'clone', put: false }"
            :sort="false"
            ghostClass=""
            v-slot="drag"
        >
            <tree-item
                :item="drag.item"
                :isEdit="activeIndex === drag.index"
                @active="activeIndex = drag.index"
                @blur="activeIndex = -1"
                @update="updateHandle"
                @refresh="findList"
                v-show="
                    !drag.item.isDel && (drag.item.isPublic === Boolean(filter) || filter === 'all')
                "
            ></tree-item>
        </drag-list>

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
            <add-button title="新增知识树" @click="clickAddHandle"></add-button>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
