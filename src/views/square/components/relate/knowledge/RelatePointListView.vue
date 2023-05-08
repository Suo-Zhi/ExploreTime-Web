<script setup lang="ts">
import { Point } from '@/api/point/types';

const isLoad = ref(false);

const { history } = store.square();
const link = computed(() => history.links[history.activeIndex]); // 当前链接信息

// 查
const list = ref<Point[]>([]);
const keywords = inject<any>('keywords'); // 搜索关键字
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findPointRelate({
            targetId: link.value.targetId,
            targetType: link.value.targetType as any,
            keywords: keywords.value,
        })
        .then((res) => {
            list.value = res.data;
        });
    isLoad.value = false;
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
    <!-- 关联知识点列表 -->
    <load-box :isLoad="isLoad" class="relate-point-list h-full pb-[36px] relative">
        <scroll-bar>
            <point-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
                v-show="!item.isDel"
            ></point-item-view>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联知识点" />
    </load-box>
</template>

<style lang="scss" scoped></style>
