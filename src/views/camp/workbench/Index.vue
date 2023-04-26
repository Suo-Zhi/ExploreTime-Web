<script setup lang="ts">
// import * as icons from '@icon-park/vue-next';

// 获取nextScreen情况
const nextScreen = ref<'left' | 'right'>(store.setting().nextScreen); // 下一次激活屏幕
watch(
    () => store.setting().nextScreen,
    () => {
        nextScreen.value = store.setting().nextScreen;
    }
);
</script>

<template>
    <!-- 工作台 -->
    <section class="workbench min-h-screen flex flex-col">
        <!-- 顶部导航 -->
        <section class="top-nav h-[30px]">
            <div class="left">
                <split-screen-button></split-screen-button>
            </div>
            <div class="center"></div>
            <div class="right"></div>
        </section>
        <!-- 工作台主体 -->
        <main class="main flex-1 relative overflow-hidden">
            <split-screen>
                <template #left>
                    <span :class="nextScreen === 'left' ? 'bg-primary' : ''">left</span>
                </template>
                <template #right>
                    <span :class="nextScreen === 'right' ? 'bg-primary' : ''">right</span>
                </template>
            </split-screen>
        </main>
    </section>
</template>

<style lang="scss" scoped></style>
