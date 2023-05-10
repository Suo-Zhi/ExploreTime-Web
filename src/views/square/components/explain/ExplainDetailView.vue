<script setup lang="ts">
import { Explain } from '@/api/explain/types';

const { history } = store.square();
const explainId = computed(() => {
    if (history.activeIndex !== -1) return history.links[history.activeIndex].targetId;
    else return -1;
}); //  当前讲解Id

// 获取树详情
const isLoad = ref(false);
const keywords = ref('');
const explain = ref({} as Explain);
const getDetail = async () => {
    isLoad.value = true;
    await api.explain.getDetail(explainId.value).then((res) => {
        explain.value = res.data;
    });
    isLoad.value = false;
};
watch(
    explainId,
    () => {
        if (history.activeIndex !== -1) getDetail();
    },
    { immediate: true }
);

const { openDiscussArea } = store.square(); // 打开讨论区

// 打开关联详情
const viewRelateDetail = () => {
    store.square().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '讲解关联-' + explain.value.title,
        targetId: explain.value.id,
        targetType: 'explain',
    });
};
</script>

<template>
    <common-box class="explain-detail pb-[6px]" :isLoad="isLoad">
        <div class="main" v-if="explain.id">
            <!-- 讲解标题 -->
            <div class="tree-name text-center mt-[6px] mb-[8px] relative">
                <user-item
                    :id="explain.authorId"
                    :showFollow="true"
                    class="absolute -top-[2px]"
                ></user-item>
                <text-view
                    :text="explain.title"
                    textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
                ></text-view>
            </div>

            <!-- 讲解内容 -->
            <text-view :text="explain.content"></text-view>
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
                    @click="getDetail"
                />
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联项"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(explain.id, 'explain')"
                />
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
