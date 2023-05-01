<script setup lang="ts">
import { Chunk } from '@/api/chunk/types';

interface Props {
    item: Chunk;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <!-- 知识块 -->
    <card-fold>
        <template #header>
            <div>{{ props.item.name }}</div>
        </template>
        <div>{{ props.item.preface }}</div>
    </card-fold>
</template>

<style lang="scss" scoped></style>
