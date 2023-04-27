<script setup lang="ts">
const text = ref('infoBox');
</script>

<template>
    {{ text }}
    <cus-editor v-model="text"></cus-editor>
</template>

<style lang="scss" scoped></style>
