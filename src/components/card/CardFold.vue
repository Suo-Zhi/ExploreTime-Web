<script setup lang="ts">
interface Props {
    border?: boolean; // 是否带边框
    line?: boolean; // 是否在卡片头部和主体间显示水平线
    isToggle?: boolean; // 是否顶部操作栏显示情况
}
const props = withDefaults(defineProps<Props>(), {
    border: true,
    line: true,
    isToggle: true,
});

// 折叠动画
let isFold = ref(false);
const listeners = {
    // 元素由隐藏变为可见
    onEnter(el: HTMLElement) {
        el.style.height = 'auto'; // 将高度设为auto，以获取该元素的计算高度
        const endHeight = window.getComputedStyle(el).height; // 计算高度
        el.style.height = '0px'; // 将高度再设置为0
        el.offsetHeight; // 强制重绘，重绘后再改变高度才会产生动画
        el.style.height = endHeight; // 设置为计算高度
    },
    onAfterEnter(el: HTMLElement) {
        el.style.height = 'auto'; // 过渡进入后，将高度恢复
    },
    // 元素由可见变为隐藏
    onLeave(el: HTMLElement) {
        el.style.height = window.getComputedStyle(el).height; // 计算高度
        el.offsetHeight; // 强制重绘，重绘后再改变高度才会产生动画
        el.style.height = '0px'; // 将高度设置为0
    },
    onAfterLeave(el: HTMLElement) {
        el.style.height = 'auto'; // 过渡离开后，将高度恢复
    },
};
</script>

<template>
    <section class="chunk-card relative rounded-sm" :class="[{ 'border-base': props.border }]">
        <!-- 头部 -->
        <div class="card-header flex items-center group">
            <!-- 折叠按钮 -->
            <icon-down
                size="18"
                :strokeWidth="3"
                class="text-slate-400 click-style ml-[5px] mr-1 mt-[2px]"
                :class="isFold ? '-rotate-90' : ''"
                @click="isFold = !isFold"
            />
            <!-- 头部内容 -->
            <div class="flex-1 flex justify-between items-center">
                <slot name="title"></slot>
                <div :class="{ 'group-show': props.isToggle }"><slot name="actions"></slot></div>
            </div>
        </div>

        <!-- 可折叠区 -->
        <div class="card-body relative">
            <transition v-bind="listeners as any">
                <div class="collapse-transition" :class="{ 'border-t': props.line }" v-if="!isFold">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.collapse-transition {
    overflow: hidden;
    transition: height 0.22s ease-in-out;
}
</style>
