<script setup lang="ts">
const menuList = ref([
    {
        title: '统计',
        icon: 'ChartPie',
        isActive: false,
        routeName: 'dashboard',
    },
    {
        title: '工作台',
        icon: 'Workbench',
        isActive: false,
        routeName: 'workbench',
    },
    {
        title: '标记',
        icon: 'BookmarkOne',
        isActive: false,
        routeName: 'mark',
    },
]);
</script>

<template>
    <!-- 作者空间 -->
    <div class="camp min-h-screen flex">
        <layout-menu switchTarget="square" :menuList="menuList"></layout-menu>
        <!-- 主体内容 -->
        <div class="main flex-1 items-stretch relative overflow-hidden">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
