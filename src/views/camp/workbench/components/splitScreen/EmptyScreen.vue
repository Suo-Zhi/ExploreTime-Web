<script setup lang="ts"></script>

<template>
    <section class="empty-screen w-full h-full"></section>
</template>

<style lang="scss" scoped>
.empty-screen {
    background: linear-gradient(
        45deg,
        $color-secondary 0,
        $color-secondary 25%,
        transparent 25%,
        transparent 50%,
        $color-secondary 50%,
        $color-secondary 75%,
        transparent 75%,
        transparent
    );
    background-size: 250px 250px;
}
</style>
