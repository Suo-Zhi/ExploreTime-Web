<script setup lang="ts">
import { Section } from '@/store/setting/types';

// 各屏幕中需显示的组件
const screen = ref(store.setting().screen);

// 切换显示组件
const switchSection = (section: Section) => {
    // 原本显示则不显示
    if (screen.value.left === section) return (screen.value.left = '');
    if (screen.value.right === section) return (screen.value.right = '');

    // 原本不显示则显示
    const { nextScreen } = store.setting();
    screen.value[nextScreen] = section;

    // 持久化存储
    localCache.set(`${nextScreen}Screen`, section);
    store.setting().screen[nextScreen] = section;
};
</script>

<template>
    <!-- 工作台 -->
    <section class="workbench min-h-screen flex flex-col">
        <!-- 顶部导航 -->
        <section class="top-nav h-[30px] p-2 flex items-center">
            <div class="left flex">
                <split-screen-button></split-screen-button>
                <!-- 工作台切换按钮 -->
                <section class="module-switch flex">
                    <!-- 知识切换 -->
                    <section
                        class="knowledge-switch ml-2 grid grid-flow-col gap-2 items-center px-2 border-x-2 border-gray-200"
                    >
                        <icon-inbox
                            size="18"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'info' || screen.right === 'info'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="信息收集箱"
                            @click="switchSection('info')"
                        />
                        <icon-list-two
                            size="18"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'point' || screen.right === 'point'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="知识点列表"
                            @click="switchSection('point')"
                        />
                        <icon-tree-list
                            size="19"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'chunk' || screen.right === 'chunk'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="知识块列表"
                            @click="switchSection('chunk')"
                        />
                        <icon-christmas-tree-one
                            size="18"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'tree' || screen.right === 'tree'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="知识树列表"
                            @click="switchSection('tree')"
                        />
                    </section>
                    <!-- 额外切换 -->
                    <section
                        class="knowledge-switch grid grid-flow-col gap-2 items-center px-2 border-r-2 border-gray-200"
                    >
                        <icon-doc-detail
                            size="18"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'explain' || screen.right === 'explain'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="讲解"
                            @click="switchSection('explain')"
                        />
                        <icon-list-view
                            size="19"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'exercise' || screen.right === 'exercise'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="习题"
                            @click="switchSection('exercise')"
                        />
                        <icon-folder-close
                            size="18"
                            :strokeWidth="3"
                            class="cursor-pointer hover:text-primary duration-200"
                            :class="
                                screen.left === 'exerciseSet' || screen.right === 'exerciseSet'
                                    ? 'text-primary'
                                    : 'text-icon-gray'
                            "
                            title="习题集"
                            @click="switchSection('exerciseSet')"
                        />
                    </section>
                </section>
            </div>
            <div class="center"></div>
            <div class="right"></div>
        </section>
        <!-- 工作台主体 -->
        <main class="main flex-1 relative overflow-hidden">
            <split-screen>
                <template #left>
                    {{ screen.left }}
                </template>
                <template #right>
                    {{ screen.right }}
                </template>
            </split-screen>
        </main>
    </section>
</template>

<style lang="scss" scoped></style>
