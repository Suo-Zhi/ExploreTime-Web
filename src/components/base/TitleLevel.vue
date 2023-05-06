<script setup lang="ts">
interface Props {
    level?: {
        deep: number;
        prefix: string;
    };
}
const props = withDefaults(defineProps<Props>(), {});

const levelStyle = computed(() => {
    if (props.level) return 'level' + (props.level.deep < 6 ? props.level.deep : '-min');
    else return 'level-min';
});
</script>

<template>
    <div
        v-if="props.level"
        class="title-level text-slate-800 flex items-center"
        :class="[
            levelStyle,
            props.level.deep === 1 ? 'justify-center' : '',
            props.level.deep < 4 ? 'my-2' : '',
            props.level.deep >= 4 ? 'my-1' : '',
        ]"
    >
        <span :class="props.level.deep > 1 ? 'mr-[6px]' : ''">{{ props.level.prefix }}</span>
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
