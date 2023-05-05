<script setup lang="ts">
interface Props {
    deep: number;
    level: string;
}
const props = withDefaults(defineProps<Props>(), {});

const levelStyle = 'level' + (props.deep < 6 ? props.deep : '-min');
</script>

<template>
    <div
        class="title-level text-slate-800 flex items-center"
        :class="[
            levelStyle,
            props.deep === 1 ? 'justify-center' : '',
            props.deep < 3 ? 'my-2' : '',
            props.deep === 4 ? 'my-1' : '',
        ]"
    >
        <span :class="props.deep > 1 ? 'mr-[6px]' : ''">{{ props.level }}</span>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.level1 {
    font-size: 26px;
}
.level2 {
    font-size: 24px;
}
.level3 {
    font-size: 20px;
}
.level4 {
    font-size: 18px;
}
.level5 {
    font-size: 16px;
}
.level-min {
    font-size: 14px;
}
</style>
