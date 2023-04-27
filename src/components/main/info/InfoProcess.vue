<script setup lang="ts">
const isLoad = ref(false);
onMounted(() => {
    isLoad.value = true;
    setTimeout(() => {
        isLoad.value = false;
    }, 3000);
});
</script>

<template>
    <load-box class="w-[200px] h-[200px] bg-pink-200" :isLoad="isLoad"></load-box>
</template>

<style lang="scss" scoped></style>
