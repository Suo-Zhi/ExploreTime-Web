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
const refreshChunkBox = inject<any>('refreshChunkBox');
const updateHandle = async (newValue: UpdatePointDTO) => {
    const target = list.value[activeIndex.value];
    await api.point.update(target.id, newValue).then(() => {
        // 处于搜索中则刷新列表，反之简易处理
        if (keywords.value) findList();
        else {
            target.name = newValue.name;
            target.content = newValue.content;
        }
        // 刷新块列表(这里不太合理: 应该当知识块列表存在该知识点时刷新单独块,以后改)
        refreshChunkBox();
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

// 合并生成知识块
let firstIndex = -1;
let secondIndex = -1;
const startHandle = (e: any) => {
    firstIndex = e.oldIndex;
};
const endHandle = (e: any) => {
    // 当第一项置于第二项的拖拽元素上时进行合并
    const className = e.originalEvent.target.parentElement.parentElement.className;
    if (e.to.id === 'point-list' && className.search('point-item') !== -1) {
        secondIndex = e.originalEvent.target.parentElement.parentElement.dataset.index;
        mergePoint();
    }
};
const mergePoint = async () => {
    if (secondIndex >= 0 && firstIndex !== secondIndex) {
        // 新增块
        const {
            data: { id },
        } = await api.chunk.create({ name: '新知识块', preface: '', endnote: '' });
        // 新增块内容
        await api.chunkContent.upsert({
            chunkId: id,
            order: 1,
            pointId: list.value[firstIndex].id,
        });
        await api.chunkContent.upsert({
            chunkId: id,
            order: 2,
            pointId: list.value[secondIndex].id,
        });
        // 知识点归档
        await api.point.toggleRefine(list.value[firstIndex].id, true);
        await api.point.toggleRefine(list.value[secondIndex].id, true);
        // 刷新知识点列表和知识块列表
        findList();
        refreshChunkBox();
    }
};
</script>

<template>
    <common-box class="point-process" :isLoad="isLoad">
        <!-- 知识点列表 -->
        <drag-list
            :list="list"
            item-key="id"
            :group="{ name: 'point', pull: 'clone', put: false }"
            :sort="false"
            ghostClass=""
            v-slot="drag"
            id="point-list"
            @start="startHandle"
            @end="endHandle"
        >
            <point-item
                :item="drag.item"
                :isEdit="activeIndex === drag.index"
                :data-index="drag.index"
                @active="activeIndex = drag.index"
                @blur="activeIndex = -1"
                @update="updateHandle"
                @refresh="findList"
                v-show="
                    !drag.item.isDel && (drag.item.isRefine === Boolean(filter) || filter === 'all')
                "
            ></point-item>
        </drag-list>

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
