<script setup lang="ts">
const { history, removeHistoryLink } = store.setting();
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
</script>

<template>
    <section class="history-link-box flex items-center">
        <a-tag
            v-for="(link, index) of history.links"
            :key="index"
            :color="
                index === history.activeIndex.left
                    ? 'green'
                    : index === history.activeIndex.right
                    ? 'cyan'
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
