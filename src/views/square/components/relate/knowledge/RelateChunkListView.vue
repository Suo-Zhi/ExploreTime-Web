<script setup lang="ts">
import { Chunk } from '@/api/chunk/types';

const { history } = store.square();
const link = computed(() => history.links[history.activeIndex]); // 当前链接信息

const isLoad = ref(false);

// 查
const list = ref<Chunk[]>([]);
const keywords = inject<any>('keywords'); // 搜索关键字
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findChunkRelate({
            targetId: link.value.targetId,
            targetType: link.value.targetType as any,
            keywords: keywords.value,
        })
        .then((res) => {
            list.value = res.data;
        })
        .finally(() => {
            isLoad.value = false;
        });
};
watch(
    () => history,
    () => {
        if (history.activeIndex !== -1) findList();
    },
    { immediate: true, deep: true }
);
</script>

<template>
    <!-- 关联知识块列表 -->
    <load-box :isLoad="isLoad" class="relate-chunk-list h-full pb-[36px] relative">
        <scroll-bar>
            <chunk-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
                v-show="!item.isDel"
                @refresh="findList"
            ></chunk-item-view>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联知识块" />
    </load-box>
</template>

<style lang="scss" scoped></style>
