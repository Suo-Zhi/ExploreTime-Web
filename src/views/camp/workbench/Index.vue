<script setup lang="ts">
// import * as icons from '@icon-park/vue-next';

const isSplitScreen = ref(store.setting().isSplitScreen); // 是否分屏
const nextScreen = ref<'left' | 'right'>('right'); // 下一次激活屏幕
let size = ref(0.5); // 各屏占比
let splitHeight = ref('600px'); // 屏幕高度

onMounted(() => {
    // 动态计算屏幕高度
    const main = document.querySelector('.main') as HTMLElement;
    splitHeight.value = main.offsetHeight + 'px';
});

// 切换分屏状态
watch(
    isSplitScreen,
    () => {
        if (isSplitScreen.value) {
            size.value = 0.5;
        } else {
            size.value = 1;
            nextScreen.value = 'left';
        }
        localCache.set('isSplitScreen', isSplitScreen.value);
        store.setting().isSplitScreen = isSplitScreen.value;
    },
    { immediate: true }
);
</script>

<template>
    <!-- 工作台 -->
    <section class="workbench min-h-screen flex flex-col">
        <!-- 顶部导航 -->
        <section class="top-nav h-[30px]">
            <div class="left">
                <!-- 分屏相关按钮 -->
                <section
                    class="split-screen-btn relative cursor-pointer inline-block group"
                    @click="isSplitScreen = !isSplitScreen"
                >
                    <!-- 当前激活屏幕标识 -->
                    <span
                        class="absolute bg-primary w-[7px] h-[11px] top-[6px]"
                        :class="[
                            isSplitScreen ? '' : 'hidden',
                            nextScreen === 'right' ? 'left-[3px]' : 'left-[9px]',
                        ]"
                    ></span>
                    <!-- 是否分屏按钮 -->
                    <icon-top-bar
                        size="19"
                        :strokeWidth="3"
                        class="group-hover:text-primary"
                        :title="!isSplitScreen ? '分屏' : '合并'"
                    />
                </section>
            </div>
            <div class="center"></div>
            <div class="right"></div>
        </section>
        <!-- 工作台主体 -->
        <main class="main flex-1 relative overflow-hidden">
            <!-- 注意：这里计算高度用:style,不要用:class -->
            <a-split class="w-full absolute" v-model:size="size" :style="{ height: splitHeight }">
                <template #first>
                    <!-- 左屏 -->
                    <section
                        class="left-screen w-full h-full relative overflow-hidden"
                        @click="isSplitScreen ? (nextScreen = 'right') : ''"
                    >
                        <span :class="nextScreen === 'left' ? 'bg-primary' : ''">left</span>
                    </section>
                </template>
                <template #second>
                    <!-- 右屏 -->
                    <section
                        class="right-screen w-full h-full relative overflow-hidden"
                        @click="nextScreen = 'left'"
                    >
                        <span :class="nextScreen === 'right' ? 'bg-primary' : ''">right</span>
                    </section>
                </template>
            </a-split>
        </main>
    </section>
</template>

<style lang="scss" scoped></style>
