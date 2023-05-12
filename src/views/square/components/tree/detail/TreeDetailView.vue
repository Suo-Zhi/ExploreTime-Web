<script setup lang="ts">
import { TreeDetail } from '@/api/tree/treeNode/types';

const { history } = store.square();
const treeId = computed(() => {
    if (history.activeIndex !== -1) return history.links[history.activeIndex].targetId;
    else return -1;
}); //  当前树Id

// 获取树详情
const isLoad = ref(false);
const keywords = ref('');
const treeDetail = ref({} as TreeDetail);
const getTreeDetail = async () => {
    isLoad.value = true;
    await api.treeNode.getTreeDetail(treeId.value).then((res) => {
        treeDetail.value = res.data;
    });
    isLoad.value = false;
};
watch(
    treeId,
    () => {
        if (history.activeIndex !== -1) getTreeDetail();
    },
    { immediate: true }
);

const { openDiscussArea } = store.square(); // 打开讨论区
</script>

<template>
    <common-box class="tree-detail pb-[6px]" :isLoad="isLoad">
        <div class="main" v-if="treeDetail.id">
            <!-- 知识树名 -->
            <div class="tree-name text-center mt-[6px] mb-[8px] relative">
                <user-item
                    :id="treeDetail.authorId"
                    :showFollow="true"
                    class="absolute -top-[2px]"
                ></user-item>
                <text-view
                    :text="treeDetail.name"
                    textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
                ></text-view>
            </div>

            <!-- 知识树前言 -->
            <div class="preface !ml-[2px] mb-[5px]">
                <text-view :text="treeDetail.preface"></text-view>
            </div>

            <!-- 知识树节点 -->
            <tree-node-list-view
                :treeId="treeDetail.id"
                :parentNodeId="null"
                :deep="0"
                :parentPrefix="''"
                :nodes="treeDetail.nodes"
            ></tree-node-list-view>
        </div>

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
                    @click="getTreeDetail"
                />
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联项"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(treeDetail.id, 'tree')"
                />
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
