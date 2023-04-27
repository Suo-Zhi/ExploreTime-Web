<script setup lang="ts">
const search = (keywords: string) => {
    console.log(keywords);
};
</script>

<template>
    <search-bar @search="search"></search-bar>
</template>

<style lang="scss" scoped></style>
