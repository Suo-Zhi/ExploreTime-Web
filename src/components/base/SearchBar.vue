<script setup lang="ts">
const isFold = ref(true); // 是否展开搜索栏
const keywords = ref(''); // 搜索关键字
</script>

<template>
    <!-- 搜索框 -->
    <a-input
        allow-clear
        placeholder="按 Enter 搜索"
        class="h-[24px] !bg-white !px-0 !border-0 !border-b !rounded-none"
        :class="isFold ? '!w-[16px]' : '!w-[150px]'"
        v-model="keywords"
        @input="$emit('update:modelValue', $event)"
        @keyup.enter="$emit('search', keywords)"
        @clear="
            $emit('update:modelValue', '');
            $emit('search', '');
        "
        @blur="keywords ? '' : (isFold = true)"
        @focus="isFold = false"
    >
        <template #prefix>
            <icon-search class="cursor-pointer" />
        </template>
    </a-input>
</template>

<style lang="scss" scoped></style>
