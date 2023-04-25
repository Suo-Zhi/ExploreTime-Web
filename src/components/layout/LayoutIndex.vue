<script setup lang="ts">
import { Menu, SkipTarget } from './types';

interface Props {
    skipTarget: SkipTarget; // 要切换的目标
    menuList: Menu[];
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div class="layout-index min-h-screen flex">
        <layout-menu :skipTarget="props.skipTarget" :menuList="props.menuList"></layout-menu>
        <!-- 主体内容 -->
        <div class="main flex-1 items-stretch relative overflow-hidden">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
