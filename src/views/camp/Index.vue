<script setup lang="ts">
const getUserInfo = async () => {
    const res = await api.auth.getCurrentUserInfo();
    store.user().userinfo = res.data;
    console.log(store.user().userinfo);
};
getUserInfo();
</script>

<template>index</template>

<style lang="scss" scoped></style>
