<script setup lang="ts">
import { OutputType } from '@/api/relate/types';

const targetId = inject<number>('targetId'); // 源目标Id
const targetType = inject<OutputType>('targetType'); // 源目标类型
const keywords = inject<string>('keywords'); // 搜索关键字
</script>

<template>
    <!-- 关联知识点列表 -->
    <section class="relate-point-list">{{ targetId }} | {{ targetType }} | {{ keywords }}</section>
</template>

<style lang="scss" scoped></style>
