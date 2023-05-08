<script setup lang="ts">
interface Props {
    img?: string;
    text?: string;
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
            <span v-if="props.text">{{ props.text.substring(0, 1) }}</span>
            <span v-else class="text-white">?</span>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
