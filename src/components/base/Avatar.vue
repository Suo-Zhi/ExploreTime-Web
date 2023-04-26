<script setup lang="ts">
interface Props {
    img: string;
    text: string;
    size?: string;
}
const props = withDefaults(defineProps<Props>(), {
    size: '30px',
});
</script>

<template>
    <section class="avatar">
        <img
            v-if="props.img"
            :src="props.img"
            alt=""
            class="rounded-[50%] cursor-pointer"
            :style="{ width: props.size, height: props.size }"
        />
        <div
            v-else
            class="rounded-[50%] bg-secondary text-center leading-[30px] cursor-pointer"
            :style="{ width: props.size, height: props.size }"
        >
            {{ props.text.substring(0, 1) }}
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
