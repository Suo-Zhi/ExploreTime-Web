<script setup lang="ts">
const isSplitScreen = ref(store.setting().isSplitScreen); // 是否分屏
const nextScreen = ref<'left' | 'right'>(store.setting().nextScreen); // 下一次激活屏幕
let size = ref(0.5); // 各屏占比
let splitHeight = ref('600px'); // 屏幕高度

onMounted(() => {
    // 动态计算屏幕高度
    const main = document.querySelector('.main') as HTMLElement;
    splitHeight.value = main.offsetHeight + 'px';
});

// 监听分屏情况
watch(
    () => store.setting().isSplitScreen,
    (isSplit) => {
        isSplitScreen.value = isSplit;
        if (isSplit) {
            size.value = 0.5;
        } else {
            size.value = 1;
            nextScreen.value = 'left';
        }
    },
    { immediate: true }
);

// 共享nextScreen情况
watch(nextScreen, () => {
    store.setting().nextScreen = nextScreen.value;
});
</script>

<template>
    <!-- 注意：这里计算高度用:style,不要用:class -->
    <a-split class="w-full absolute" v-model:size="size" :style="{ height: splitHeight }">
        <template #first>
            <!-- 左屏 -->
            <section
                class="left-screen w-full h-full relative overflow-hidden"
                @click="isSplitScreen ? (nextScreen = 'right') : ''"
            >
                <slot name="left"></slot>
            </section>
        </template>
        <template #second>
            <!-- 右屏 -->
            <section
                class="right-screen w-full h-full relative overflow-hidden"
                @click="nextScreen = 'left'"
            >
                <slot name="right"></slot>
            </section>
        </template>
    </a-split>
</template>

<style lang="scss" scoped></style>
