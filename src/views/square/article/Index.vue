<script setup lang="ts">
const square = store.square(); // 是否分屏

const { history } = square; // 历史链接
</script>

<template>
    <!-- 知识共享区 -->
    <section class="knowledge-area flex flex-col">
        <square-nav title="文章共享区" index="knowledge"></square-nav>
        <main class="mt-[30px]">
            <square-split-screen>
                <template #left>
                    <explain-list-view v-if="history.activeIndex === -1"></explain-list-view>

                    <!-- 文章详情 -->
                    <explain-detail-view
                        v-else-if="history.links[history.activeIndex].linkType === 'explainDetail'"
                    ></explain-detail-view>

                    <!-- 关联详情 -->
                    <relate-detail-view
                        v-else-if="history.links[history.activeIndex].linkType === 'relateDetail'"
                    ></relate-detail-view>
                </template>

                <template #right>
                    <!-- 信息收集箱 -->
                    <auth-box>
                        <info-process v-show="square.isOpenInfoBox"></info-process>
                    </auth-box>
                </template>
            </square-split-screen>
        </main>
    </section>
</template>

<style lang="scss" scoped></style>
