<script setup lang="ts"></script>

<template>
    <!-- 滚动条 -->
    <a-scrollbar class="scroll-box overflow-auto px-2">
        <slot></slot>
    </a-scrollbar>
</template>

<style lang="scss">
.arco-scrollbar {
    height: 100%;
}
.arco-scrollbar-container {
    height: calc(100% - 32px);
}
.arco-scrollbar-track-direction-vertical {
    width: 9px !important;
}
.arco-scrollbar-thumb-bar {
    width: 4px !important;
}
</style>
