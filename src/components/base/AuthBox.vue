<script setup lang="ts">
const user = store.user();
</script>

<template>
    <section class="auth-box h-full">
        <!-- 未登录显示提示组件 -->
        <div v-if="!user.userinfo" class="w-full h-full relative">
            <div class="w-full absolute top-1/2 -translate-y-3/4 flex flex-col items-center">
                <a-typography-title>请先登录哦</a-typography-title>
                <a-button type="primary" @click="$router.push({ name: 'login' })">
                    前往登录
                </a-button>
            </div>
        </div>

        <!-- 已登录显示正常组件 -->
        <div v-else>
            <slot></slot>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
