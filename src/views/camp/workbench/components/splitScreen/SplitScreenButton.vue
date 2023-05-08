<script setup lang="ts">
const isSplitScreen = ref(store.setting().isSplitScreen); // 是否分屏
const nextScreen = ref<'left' | 'right'>(store.setting().nextScreen); // 下一次激活屏幕

// 切换分屏状态
watch(
    isSplitScreen,
    () => {
        // 双屏时激活右屏
        if (isSplitScreen.value) {
            store.setting().nextScreen = 'right';
        }
        // 单屏时清空右屏
        else store.setting().screen.right = '';

        // 持久化存储
        localCache.set('isSplitScreen', isSplitScreen.value);
        store.setting().isSplitScreen = isSplitScreen.value;
    },
    { immediate: true }
);

// 获取nextScreen情况
watch(
    () => store.setting().nextScreen,
    () => {
        nextScreen.value = store.setting().nextScreen;
    }
);
</script>

<template>
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
                nextScreen === 'left' ? 'left-[3px]' : 'left-[9px]',
            ]"
        ></span>
        <!-- 是否分屏按钮 -->
        <icon-top-bar
            size="19"
            :strokeWidth="3"
            class="group-hover:text-primary text-icon-gray"
            :title="!isSplitScreen ? '分屏' : '单屏'"
        />
    </section>
</template>

<style lang="scss" scoped></style>
