<script setup lang="ts">
import { ExerciseSet } from '@/api/exercise/set/types';

const { history } = store.square();
const setId = computed(() => {
    if (history.activeIndex !== -1) return history.links[history.activeIndex].targetId;
    else return -1;
}); //  当前习题集Id

// 获取习题集详情
const isLoad = ref(false);
const keywords = ref('');
const exerciseSet = ref({} as ExerciseSet);
const getDetail = async () => {
    isLoad.value = true;
    await api.exerciseSet.getDetail(setId.value).then((res) => {
        exerciseSet.value = res.data;
    });
    isLoad.value = false;
};
watch(
    setId,
    () => {
        if (history.activeIndex !== -1) getDetail();
    },
    { immediate: true }
);

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '习题集关联-' + exerciseSet.value.name,
        targetId: exerciseSet.value.id,
        targetType: 'exerciseSet',
    });
};

const { openDiscussArea } = store.square(); // 打开讨论区
</script>

<template>
    <common-box v-if="exerciseSet.id" class="exerciseSet-detail pb-[6px]" :isLoad="isLoad">
        <div class="main" v-if="exerciseSet.id">
            <!-- 习题集名 -->
            <div class="tree-name text-center mt-[6px] mb-[8px] relative">
                <user-item
                    :id="exerciseSet.authorId"
                    :showFollow="true"
                    class="absolute -top-[2px]"
                ></user-item>
                <text-view
                    :text="exerciseSet.name"
                    textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
                ></text-view>
            </div>
        </div>

        <!-- 习题集前言 -->
        <div class="preface !ml-[2px] mb-[5px]">
            <text-view :text="exerciseSet.preface"></text-view>
        </div>

        <!-- 习题列表 -->
        <exercise-set-content-view
            v-for="(item, index) of exerciseSet.content"
            :key="index"
            :item="item"
            v-show="!item.isDel"
        ></exercise-set-content-view>

        <template #navLeft>
            <search-bar v-model="keywords"></search-bar>
        </template>

        <template #navRight>
            <div class="action-bar">
                <icon-redo
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="刷新"
                    @click="getDetail"
                />
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(exerciseSet.id, 'exerciseSet')"
                />
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
