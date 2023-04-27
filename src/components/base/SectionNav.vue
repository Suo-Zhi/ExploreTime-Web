<script setup="{ context }" lang="ts">
import * as icons from '@icon-park/vue-next';

const isFold = ref(false);
</script>

<template>
    <!-- 局部导航 -->
    <section class="section-nav absolute px-2 top-0 w-full group z-20">
        <div
            class="flex justify-between items-center overflow-hidden duration-300 relative"
            :class="[isFold ? 'cursor-pointer h-[1px]' : 'h-[30px]']"
        >
            <slot></slot>

            <!-- 遮挡层 -->
            <div
                class="absolute w-full h-[1px] top-0 z-10"
                :class="[isFold ? 'bg-white ' : '']"
            ></div>
        </div>

        <!-- 折叠按钮 -->
        <component
            :is="icons['UpOne']"
            @click="isFold = !isFold"
            :class="[isFold ? '-rotate-180 -bottom-[12px]' : '']"
            size="18"
            :strokeWidth="3"
            theme="filled"
            class="text-secondary cursor-pointer duration-100 group-hover:block hidden absolute left-1/2 -translate-x-1/2 -bottom-[7px] z-20"
        ></component>
    </section>
</template>

<style lang="scss" scoped></style>
