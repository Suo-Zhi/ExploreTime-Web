<script setup lang="ts">
const square = store.square(); // 是否分屏

const { history } = square; // 历史链接
</script>

<template>
    <!-- 习题共享区 -->
    <section class="exercise-area flex flex-col">
        <square-nav title="习题共享区" index="exercise"></square-nav>
        <main class="mt-[30px]">
            <square-split-screen>
                <template #left>
                    <exercise-set-list-view
                        v-if="history.activeIndex === -1"
                    ></exercise-set-list-view>

                    <!-- 文章详情 -->
                    <exercise-set-detail-view
                        v-else-if="
                            history.links[history.activeIndex].linkType === 'exerciseSetDetail'
                        "
                    ></exercise-set-detail-view>

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
