<script setup lang="ts">
interface Props {
    title: string;
    index: 'knowledge' | 'article' | 'exercise';
}
const props = withDefaults(defineProps<Props>(), {});

const isFoldNav = ref(false);
const keywords = ref('');
</script>

<template>
    <section-nav v-model="isFoldNav">
        <!-- 导航左侧 -->
        <div class="flex items-center">
            <!-- 返回模块根页面按钮 -->
            <div class="pr-2 border-r-2 border-gray-200">
                <a-tag
                    color="#168cff"
                    size="medium"
                    class="cursor-pointer select-none"
                    @click="$router.push({ name: props.index })"
                >
                    {{ props.title }}
                </a-tag>
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
