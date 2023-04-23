<script setup lang="ts"></script>

<template>
    <RollBackground></RollBackground>
    <div
        class="auth-box relative overflow-y-auto overflow-x-hidden w-screen min-h-screen flex items-center justify-center"
    >
        <router-view #default="{ Component }">
            <transition
                appear
                enter-active-class="animated animate__fadeInRight"
                leave-active-class="animated animate__fadeOutLeft"
            >
                <component :is="Component" class="absolute" />
            </transition>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
.animate__fadeInRight {
    animation-duration: 1s;
}
.animate__fadeOutLeft {
    animation-duration: 0.6s;
}
</style>
