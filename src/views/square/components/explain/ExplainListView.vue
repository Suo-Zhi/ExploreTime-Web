<script setup lang="ts">
import { Explain } from '@/api/explain/types';

const isLoad = ref(false);

// 查
const list = ref<Explain[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.explain
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
            <explain-item-view
                v-for="(item, index) of list"
                :key="index"
                :item="item"
            ></explain-item-view>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
