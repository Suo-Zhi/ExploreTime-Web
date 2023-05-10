<script setup lang="ts">
import { ExerciseSet } from '@/api/exercise/set/types';

const isLoad = ref(false);

// 查
const list = ref<ExerciseSet[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.exerciseSet
        .findPublic(keywords.value)
        .then((res) => {
            list.value = res.data;
        })
        .finally(() => {
            isLoad.value = false;
        });
};

findList();
</script>

<template>
    <load-box :isLoad="isLoad" class="exercise-set-list-view h-full">
        <scroll-bar>
            <exercise-set-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
            ></exercise-set-item-view>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
