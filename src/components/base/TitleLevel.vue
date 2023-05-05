<script setup lang="ts">
interface Props {
    deep: number;
    prefix: string;
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
            props.deep < 4 ? 'my-2' : '',
            props.deep >= 4 ? 'my-1' : '',
        ]"
    >
        <span :class="props.deep > 1 ? 'mr-[6px]' : ''">{{ props.prefix }}</span>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.level1 {
    font-size: 22px;
}
.level2 {
    font-size: 21px;
}
.level3 {
    font-size: 20px;
}
.level4 {
    font-size: 19px;
}
.level5 {
    font-size: 18px;
}
.level-min {
    font-size: 17px;
}
</style>
