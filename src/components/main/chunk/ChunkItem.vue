<script setup lang="ts">
import { Chunk } from '@/api/chunk/types';

interface Props {
    item: Chunk;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <!-- 知识块 -->
    <section class="chunk-item">
        <div>{{ props.item.name }}</div>
        <div>{{ props.item.preface }}</div>
        <div>{{ props.item.content }}</div>
        <div>{{ props.item.endnote }}</div>
        <div>{{ props.item.createTime }}</div>
    </section>
</template>

<style lang="scss" scoped></style>
