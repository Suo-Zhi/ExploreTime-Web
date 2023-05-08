<script setup lang="ts">
import { Tree } from '@/api/tree/types';

const isLoad = ref(false);

// 查
const list = ref<Tree[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.tree
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
            <tree-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
            ></tree-item-view>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
