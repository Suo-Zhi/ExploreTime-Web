<script setup lang="ts">
import { Tree } from '@/api/tree/types';

const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const keywords = inject<any>('keywords'); // 搜索关键字

const isLoad = ref(false);

// 查
const list = ref<Tree[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findTreeRelate({
            targetId: targetId.value,
            targetType: targetType.value,
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
    <load-box :isLoad="isLoad" class="relate-point-list h-full pb-[36px] relative">
        <scroll-bar>
            <relate-tree-item
                v-for="(item, index) of list"
                :key="index"
                :item="item"
                :isEdit="activeIndex === index"
                @refresh="findList"
                v-show="!item.isDel"
            ></relate-tree-item>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联知识树" />
    </load-box>
</template>

<style lang="scss" scoped></style>
