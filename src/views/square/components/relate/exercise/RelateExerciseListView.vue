<script setup lang="ts">
import { Exercise } from '@/api/exercise/types';

const { history } = store.square();
const targetId = computed(() => history.links[history.activeIndex]?.targetId); // 源目标Id
const targetType = computed(() => history.links[history.activeIndex]?.targetType); // 源目标类型
const keywords = inject<any>('keywords'); // 搜索关键字

const isLoad = ref(false);

// 查
const list = ref<Exercise[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findExerciseRelate({
            targetId: targetId.value,
            targetType: targetType.value as any,
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
        if (targetId.value) findList();
    },
    { immediate: true }
);

const activeIndex = ref(-1);
</script>

<template>
    <!-- 关联习题列表 -->
    <load-box :isLoad="isLoad" class="relate-exrecise-list h-full pb-[36px] relative">
        <scroll-bar>
            <exercise-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
                :isEdit="activeIndex === index"
                @refresh="findList"
                v-show="!item.isDel"
            ></exercise-item-view>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联习题" />
    </load-box>
</template>

<style lang="scss" scoped></style>
