<script setup lang="ts">
interface Props {
    topText: string; // 上方按钮提示
    topColor?: string; // 上方按钮颜色
    bottonText: string; // 下方按钮提示
    bottonColor?: string; // 下方按钮颜色
}
const props = withDefaults(defineProps<Props>(), {
    topColor: 'primary',
    bottonColor: 'green-500',
});
</script>

<template>
    <section class="add-line w-full h-[1px] group flex items-center cursor-pointer relative">
        <div class="relative w-full h-[1px] bg-gray-200">
            <icon-plus
                size="18"
                :strokeWidth="3"
                class="text-transparent duration-300 cursor-pointer inline-block -mt-4 -ml-[12px] absolute"
                :class="`group-hover:text-${props.topColor}`"
                :title="props.topText"
                @click="$emit('addTop')"
            />
            <icon-plus
                size="18"
                :strokeWidth="3"
                class="text-transparent duration-300 cursor-pointer inline-block -mt-[1px] -ml-[12px] absolute"
                :class="`group-hover:text-${props.bottonColor}`"
                :title="props.bottonText"
                @click="$emit('addBotton')"
            />
        </div>
        <!-- 遮罩 -->
        <div
            class="w-full h-full absolute bg-white group-hover:bg-transparent z-10 duration-300"
        ></div>
    </section>
</template>

<style lang="scss" scoped></style>
