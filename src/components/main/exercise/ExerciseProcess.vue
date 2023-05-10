<script setup lang="ts">
import { UpdateExerciseDTO } from '@/api/exercise/dto';
import { Exercise, SortExercise } from '@/api/exercise/types';

const isLoad = ref(false);

// 排序
const sort = ref<SortExercise>(store.setting().sort.exercise);
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
const list = ref<Exercise[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.exercise
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
const updateHandle = async (newValue: UpdateExerciseDTO) => {
    const target = list.value[activeIndex.value];
    await api.exercise.update(target.id, newValue).then(() => {
        // 处于搜索中则刷新列表，反之简易处理
        if (keywords.value) findList();
        else {
            target.question = newValue.question;
            target.detail = newValue.detail;
            target.answer = newValue.answer;
            target.analysis = newValue.analysis;
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
        question: '',
        detail: '',
        answer: '',
        analysis: '',
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
    <common-box class="exercise-process" :isLoad="isLoad">
        <!-- 知识点列表 -->
        <drag-list
            :list="list"
            item-key="id"
            :group="{ name: 'exercise', pull: 'clone', put: false }"
            :sort="false"
            ghostClass=""
            v-slot="drag"
        >
            <exercise-item
                :item="drag.item"
                :isEdit="activeIndex === drag.index"
                @active="activeIndex = drag.index"
                @blur="activeIndex = -1"
                @update="updateHandle"
                @refresh="findList"
                v-show="
                    !drag.item.isDel && (drag.item.isRefine === Boolean(filter) || filter === 'all')
                "
            ></exercise-item>
        </drag-list>

        <template #navLeft>
            <select-sort
                v-model="sort.field"
                v-model:order="sort.order"
                :options="sortOptions"
                storeKey="exercise"
                cacheKey="exercise"
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
