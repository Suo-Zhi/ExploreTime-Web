<script setup lang="ts">
const { history } = store.setting();
const { nextScreen } = store.setting();

const id = ref(); // 关联源目标Id
const type = ref(); // 关联源目标类型

const activeIndex = computed(() => history.activeIndex[nextScreen]);

// 同步关联源目标值
watch(
    activeIndex,
    () => {
        if (activeIndex.value !== -1 && history.links[activeIndex.value]) {
            id.value = history.links[activeIndex.value].targetId;
            type.value = history.links[activeIndex.value].targetType;
        }
    },
    { immediate: true }
);
</script>

<template>
    <section class="relate-detail" v-if="type && id">{{ type }}: {{ id }}</section>
</template>

<style lang="scss" scoped></style>
