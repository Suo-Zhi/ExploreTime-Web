<script setup lang="ts">
interface Props {
    type: 'exercise' | 'exerciseSet'; // 需要展示的知识类型
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section class="relate-knowledge h-full">
        <relate-exercise-list-view v-if="props.type === 'exercise'"></relate-exercise-list-view>

        <relate-exercise-set-list-view
            v-else-if="props.type === 'exerciseSet'"
        ></relate-exercise-set-list-view>
    </section>
</template>

<style lang="scss" scoped></style>
