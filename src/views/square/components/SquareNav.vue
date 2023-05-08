<script setup lang="ts">
interface Props {
    title: string;
    index: 'knowledge' | 'article' | 'exercise';
}
const props = withDefaults(defineProps<Props>(), {});

const isFoldNav = ref(false);
const keywords = ref('');

const square = store.square(); // 是否分屏
</script>

<template>
    <section-nav v-model="isFoldNav">
        <!-- 导航左侧 -->
        <div class="flex items-center">
            <!-- 返回模块根页面按钮 -->
            <a-tag
                color="#168cff"
                size="medium"
                class="cursor-pointer select-none"
                @click="square.history.activeIndex = -1"
            >
                {{ props.title }}
            </a-tag>

            <!-- 打开信息收集箱按钮 -->
            <div class="px-1 border-r-2 border-gray-200">
                <icon-inbox
                    size="19"
                    :strokeWidth="3"
                    class="action-btn"
                    :class="square.isOpenInfoBox ? '!text-primary' : ''"
                    @click="square.isOpenInfoBox = !square.isOpenInfoBox"
                    :title="square.isOpenInfoBox ? '打开信息收集箱' : '关闭信息收集箱'"
                />
            </div>

            <!-- 历史链接 -->
            <square-link></square-link>
        </div>
        <!-- 导航右侧 -->
        <div class="items-center flex">
            <search-bar v-model="keywords"></search-bar>
        </div>
    </section-nav>
</template>

<style lang="scss" scoped></style>
