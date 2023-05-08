<script setup lang="ts">
const square = store.square(); // 是否分屏
</script>

<template>
    <!-- 知识共享区 -->
    <section class="knowledge-area flex flex-col">
        <square-nav title="知识共享区" index="knowledge"></square-nav>
        <main class="mt-[30px]">
            <square-split-screen>
                <template #left>
                    <tree-list-view></tree-list-view>
                </template>

                <template #right>
                    <info-process v-if="square.isOpenInfoBox"></info-process>
                </template>
            </square-split-screen>
        </main>
    </section>
</template>

<style lang="scss" scoped></style>
