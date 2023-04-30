<script setup lang="ts">
import { Point } from '@/api/point/types';

const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const keywords = inject<any>('keywords'); // 搜索关键字

const isLoad = ref(false);

// 查
const list = ref<Point[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findRelate({
            targetId: targetId.value,
            targetType: targetType.value,
            relateType: 'point',
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
    targetId,
    () => {
        findList();
    },
    { immediate: true }
);

const activeIndex = ref(-1);
</script>

<template>
    <!-- 关联知识点列表 -->
    <load-box :isLoad="isLoad" class="relate-point-list h-full">
        <scroll-bar>
            <relate-point-item
                v-for="(item, index) of list"
                :key="index"
                :item="item"
                :isEdit="activeIndex === index"
                v-show="!item.isDel"
            ></relate-point-item>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
