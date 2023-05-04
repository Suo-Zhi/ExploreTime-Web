<script setup lang="ts">
interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});
const { history } = store.setting();

const treeId = computed(() => history.links[history.activeIndex[props.screen]].targetId); //  当前树Id
</script>

<template>
    <section class="tree-detail">{{ treeId }}</section>
</template>

<style lang="scss" scoped></style>
