<script setup lang="ts">
const square = store.square();
const { history } = square;
</script>

<template>
    <section class="square-links">
        <a-tag
            v-for="(link, index) of history.links"
            :key="index"
            :color="index === history.activeIndex ? 'cyan' : 'blue'"
            class="ml-2 select-none"
        >
            <span class="cursor-pointer" @click="history.activeIndex = index">
                {{ link.linkTitle }}
            </span>
            <icon-close-small
                size="16"
                :strokeWidth="3"
                class="cursor-pointer text-primary hover:text-orange-400 duration-200 -mr-[6px]"
                @click="square.removeHistoryLink(index)"
            />
        </a-tag>
    </section>
</template>

<style lang="scss" scoped></style>
