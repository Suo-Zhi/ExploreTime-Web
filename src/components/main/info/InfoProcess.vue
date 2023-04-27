<script setup lang="ts">
const value = ref('true');
const options = [
    {
        label: '全部',
        value: 'all',
    },
    {
        label: '待整理',
        value: 'false',
    },
    {
        label: '已整理',
        value: 'true',
    },
];

const { test } = store.setting();
</script>

<template>
    {{ value }}
    {{ test }}
    <drop-select v-model="value" :options="options" storeKey="test"></drop-select>
</template>

<style lang="scss" scoped></style>
