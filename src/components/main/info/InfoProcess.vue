<script setup lang="ts">
const test = ref('tom');
const search = () => {
    console.log(6);
};
</script>

<template>
    {{ test }}
    <search-bar v-model="test" @search="search"></search-bar>
</template>

<style lang="scss" scoped></style>
