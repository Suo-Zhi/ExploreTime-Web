<script setup lang="ts">
import { Exercise } from '@/api/exercise/types';

const isLoad = ref(false);

// 查
const list = ref<Exercise[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.exercise
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
    <load-box :isLoad="isLoad" class="tree-list-view h-full">
        <scroll-bar>
            <expercise-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
            ></expercise-item-view>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
