<script setup lang="ts">
localCache.set(CacheKey.IsFoldMenu, true);
console.log(localCache.get(CacheKey.IsFoldMenu));
console.log(localCache.get('demo'));
console.log(localCache.get('demo', '123'));
</script>

<template>app</template>

<style lang="scss" scoped></style>
