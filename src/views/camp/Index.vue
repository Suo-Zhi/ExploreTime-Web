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
    <div class="camp">
        <layout-index skipTarget="square" :menuList="menuList"></layout-index>
    </div>
</template>

<style lang="scss" scoped></style>
