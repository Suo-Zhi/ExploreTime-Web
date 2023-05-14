<script setup lang="ts">
interface Props {
    text: string;
    color?: string;
}
const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
});
</script>

<template>
    <section class="add-line w-full h-[1px] group flex items-center cursor-pointer relative">
        <div class="relative w-full h-[1px] bg-gray-200">
            <icon-plus
                size="18"
                :strokeWidth="3"
                class="text-transparent duration-300 cursor-pointer inline-block -mt-2 -ml-[12px] absolute"
                :class="props.color ? 'group-hover:text-primary' : 'group-hover:text-green-500'"
                :title="props.text"
                @click="$emit('add')"
            />
        </div>
        <!-- 遮罩 -->
        <div
            class="w-full h-full absolute bg-white group-hover:bg-transparent z-10 duration-300"
        ></div>
    </section>
</template>

<style lang="scss" scoped></style>
