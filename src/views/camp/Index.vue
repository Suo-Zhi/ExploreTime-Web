<script setup lang="ts">
const menuList = ref([
    {
        title: '统计',
        icon: 'ChartPie',
        isActive: false,
    },
    {
        title: '工作台',
        icon: 'Workbench',
        isActive: false,
    },
    {
        title: '标记',
        icon: 'BookmarkOne',
        isActive: false,
    },
]);
</script>

<template>
    <div class="camp min-h-screen flex">
        <layout-menu switchTarget="square" :menuList="menuList"></layout-menu>
    </div>
</template>

<style lang="scss" scoped></style>
