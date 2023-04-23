<script setup lang="ts"></script>

<template>
    <div class="roll-background w-screen min-h-screen"></div>
</template>

<style lang="scss" scoped>
@import '@/common/assets/css/color.scss';

.roll-background {
    position: absolute;
    background: $color-secondary url('@/common/assets/img/roll-background.svg') repeat scroll;
    animation: animate 20s linear infinite;
    z-index: -1;
}
// 背景滚动动画
@keyframes animate {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -450px 200px;
    }
}
</style>
