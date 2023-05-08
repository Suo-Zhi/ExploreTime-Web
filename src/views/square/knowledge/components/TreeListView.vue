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
    <section class="tree-list-view">
        {{ list }}
    </section>
</template>

<style lang="scss" scoped></style>
