<script setup lang="ts">
const { history } = store.setting();
const nextScreen = ref<'left' | 'right'>('left');

watch(
    () => store.setting().nextScreen,
    (newValue) => {
        nextScreen.value = newValue;
    },
    { immediate: true }
);

// 激活链接
const switchHistory: any = inject('switchHistory');
const activeLink = (index: number) => {
    history.activeIndex[nextScreen.value] = index;
    switchHistory('relateDetail');
};

// 移除历史链接
const removeHistoryLink = (index: number) => {
    // 移除指定项
    history.links.splice(index, 1);

    // 如果移除项处于激活状态: 则清空移除项所在屏幕
    if (index === history.activeIndex.left) {
        history.activeIndex.left = -1;
        store.setting().screen.left = '';
    }
    if (index === history.activeIndex.right) {
        history.activeIndex.right = -1;
        store.setting().screen.right = '';
    }

    // 如果移除项未激活 且 移除项位于激活项前: 则激活项前移
    if (index < history.activeIndex.left && history.activeIndex.left !== -1)
        history.activeIndex.left = history.activeIndex.left - 1;
    if (index < history.activeIndex.right && history.activeIndex.right !== -1)
        history.activeIndex.right = history.activeIndex.right - 1;
};
</script>

<template>
    <section class="history-link-box flex items-center">
        <a-tag
            v-for="(link, index) of history.links"
            :key="index"
            :color="
                index === history.activeIndex.left || index === history.activeIndex.right
                    ? 'arcoblue'
                    : 'blue'
            "
            class="ml-2 select-none"
        >
            <span class="cursor-pointer" @click="activeLink(index)">
                {{ link.linkTitle }}
            </span>
            <icon-close-small
                size="16"
                :strokeWidth="3"
                class="cursor-pointer text-primary hover:text-orange-400 duration-200 -mr-[6px]"
                @click.stop="removeHistoryLink(index)"
            />
        </a-tag>
    </section>
</template>

<style lang="scss" scoped></style>
