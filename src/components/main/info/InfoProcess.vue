<script setup lang="ts">
const value = ref('createTime');
const order = ref('desc');
const options = [
    { label: '创建时间', value: 'createTime' },
    { label: '更新时间', value: 'updateTime' },
];

const state = store.setting();
</script>

<template>
    {{ value }}
    {{ order }}
    {{ state.test }}
    <select-sort
        v-model="value"
        v-model:order="order"
        :options="options"
        :cacheKey="{ value: 'a', order: 'b' }"
        :storeKey="{ value: 'test' }"
    ></select-sort>
</template>

<style lang="scss" scoped></style>
