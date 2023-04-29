<script setup lang="ts">
interface Props {
    isLoad: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const isFoldNav = ref(false);
</script>

<template>
    <section class="base-section absolute w-full h-full">
        <load-box class="h-full" :isLoad="props.isLoad">
            <!-- 局部导航 -->
            <section-nav v-model="isFoldNav">
                <div class="flex items-center">
                    <!-- 导航左侧 -->
                    <slot name="navLeft"></slot>
                </div>

                <div class="items-center flex">
                    <!-- 导航右侧 -->
                    <slot name="navRight"></slot>
                </div>
            </section-nav>

            <!-- 主体列表 -->
            <div
                class="main-list h-full duration-300"
                :class="isFoldNav ? 'pt-[1px]' : 'pt-[30px]'"
            >
                <scroll-bar>
                    <slot></slot>
                </scroll-bar>
            </div>

            <slot name="extra"></slot>
        </load-box>
    </section>
</template>

<style lang="scss" scoped></style>
