<script setup lang="ts">
const menuList = ref([
    {
        title: '知识',
        icon: 'MindmapMap',
        isActive: false,
        routeName: 'knowledge',
    },
    {
        title: '文章',
        icon: 'Notes',
        isActive: false,
        routeName: 'article',
    },
    {
        title: '习题',
        icon: 'DocumentFolder',
        isActive: false,
        routeName: 'exercise',
    },
]);
</script>

<template>
    <!-- 分享广场 -->
    <div class="square min-h-screen flex">
        <!-- 左侧导航 -->
        <layout-menu switchTarget="camp" :menuList="menuList"></layout-menu>
        <!-- 主体内容 -->
        <div class="main flex-1 items-stretch relative overflow-hidden">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
