<script setup lang="ts">
import { TreeDetail } from '@/api/tree/treeNode/types';

interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});
const { history } = store.setting();

const treeId = computed(() => history.links[history.activeIndex[props.screen]].targetId); //  当前树Id

// 获取树详情
const isLoad = ref(false);
const keywords = ref('');
const treeDetail = ref({} as TreeDetail);
const getTreeDetail = async () => {
    await api.treeNode.getTreeDetail(treeId.value).then((res) => {
        treeDetail.value = res.data;
    });
};
getTreeDetail();

const isEdit = ref(false);

// 公开
const refreshTreeBox = inject<any>('refreshTreeBox');
const togglePublicHandle = async () => {
    await api.tree.togglePublic(treeDetail.value.id, !treeDetail.value.isPublic).then(() => {
        treeDetail.value.isPublic = !treeDetail.value.isPublic;
        refreshTreeBox();
        store.global().prompt(treeDetail.value.isPublic ? '公开成功' : '已取消公开', 'success');
    });
};
</script>

<template>
    <common-box v-if="treeDetail.id" class="tree-detail" :isLoad="isLoad">
        <!-- 知识树名 -->
        <div class="tree-name text-center mt-[6px] mb-[8px]">
            <edit-item
                type="text"
                :value="treeDetail.name"
                :isEdit="isEdit"
                placeholder="请输入知识树名"
                class="text-[26px]"
                textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
            ></edit-item>
        </div>

        <!-- 知识树前言 -->
        <div class="preface bg-slate-50 border-l-4 border-secondary px-2 rounded-sm">
            <edit-item
                :value="treeDetail.preface"
                :isEdit="isEdit"
                placeholder="请输入知识树前言"
            ></edit-item>
        </div>

        <!-- 知识树内容 -->
        <section class="tree-nodes">
            <tree-node></tree-node>
        </section>

        <template #navLeft>
            <search-bar v-model="keywords"></search-bar>
        </template>

        <template #navRight>
            <div class="action-bar">
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
                />
                <lock-button
                    :isPublic="treeDetail.isPublic"
                    @click="togglePublicHandle"
                ></lock-button>
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
