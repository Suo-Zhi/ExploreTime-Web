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
    <div class="square">
        <layout-index skipTarget="camp" :menuList="menuList"></layout-index>
    </div>
</template>

<style lang="scss" scoped></style>
