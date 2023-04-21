<script setup lang="ts">
api.auth.getCurrentUserInfo().then((res) => {
    console.log(res);
});
</script>

<template>app</template>

<style lang="scss" scoped></style>
