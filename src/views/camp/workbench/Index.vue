<script setup lang="ts">
import { LinkBox, Section } from '@/store/setting/types';

// 各屏幕中需显示的组件
const screen = ref(store.setting().screen);

// 切换显示组件
const switchSection = (section: Section) => {
    // 其中一屏有该组件，则清空该屏
    if (screen.value.left === section) screen.value.left = '';
    else if (screen.value.right === section) screen.value.right = '';
    // 两屏均无该组件，则在目标屏放置该组件
    else screen.value[store.setting().nextScreen] = section;
    store.setting().screen = screen.value;
};

watch(
    screen,
    (newValue) => {
        // 不显示链接页时重置链接索引
        if (newValue.left.search('Detail') === -1) store.setting().history.activeIndex.left = -1;
        if (newValue.right.search('Detail') === -1) store.setting().history.activeIndex.right = -1;
        // 持久化存储
        localCache.set('screen', screen.value);
    },
    { deep: true }
);
watch(
    () => store.setting().history,
    (newValue) => {
        localCache.set('history', newValue);
    },
    { deep: true }
);

// 切换历史链接
const switchHistory = (linkBox: LinkBox) => {
    screen.value[store.setting().nextScreen] = linkBox;
};
provide('switchHistory', switchHistory);

// 需显示的真实组件
const realCompoent = reactive<any>({
    info: markRaw(defineAsyncComponent(() => import('@/components/main/info/InfoProcess.vue'))),
    point: markRaw(defineAsyncComponent(() => import('@/components/main/point/PointProcess.vue'))),
    chunk: markRaw(defineAsyncComponent(() => import('@/components/main/chunk/ChunkProcess.vue'))),
    tree: markRaw(defineAsyncComponent(() => import('@/components/main/tree/TreeProcess.vue'))),
    explain: markRaw(
        defineAsyncComponent(() => import('@/components/main/explain/ExplainProcess.vue'))
    ),
    exercise: markRaw(
        defineAsyncComponent(() => import('@/components/main/exercise/ExerciseProcess.vue'))
    ),
    exerciseSet: markRaw(
        defineAsyncComponent(() => import('@/components/main/info/InfoProcess.vue'))
    ),
});

/* 共享刷新数据方法 */
// 获取刷新知识点列表
const pointBoxRef = ref<any>(null);
const refreshPointBox = () => {
    if (pointBoxRef.value) pointBoxRef.value.findList();
};
provide('refreshPointBox', refreshPointBox);
// 获取刷新知识块列表
const chunkBoxRef = ref<any>(null);
const refreshChunkBox = () => {
    if (chunkBoxRef.value) chunkBoxRef.value.findList();
};
provide('refreshChunkBox', refreshChunkBox);
// 获取刷新知识树列表
const treeBoxRef = ref<any>(null);
const refreshTreeBox = () => {
    if (treeBoxRef.value) treeBoxRef.value.findList();
};
provide('refreshTreeBox', refreshTreeBox);
// 获取刷新讲解列表
const explainBoxRef = ref<any>(null);
const refreshExplainBox = () => {
    if (explainBoxRef.value) explainBoxRef.value.findList();
};
provide('refreshExplainBox', refreshExplainBox);
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
            <div class="center"><history-link></history-link></div>
        </section>
        <!-- 工作台主体 -->
        <main class="main flex-1 relative overflow-hidden">
            <split-screen>
                <template #left>
                    <relate-detail
                        v-if="screen.left && screen.left === 'relateDetail'"
                        screen="left"
                    ></relate-detail>
                    <tree-detail
                        v-else-if="screen.left && screen.left === 'treeDetail'"
                        screen="left"
                    ></tree-detail>
                    <explain-detail
                        v-else-if="screen.left && screen.left === 'explainDetail'"
                        screen="left"
                    ></explain-detail>
                    <component
                        v-else-if="screen.left"
                        :is="realCompoent[screen.left]"
                        :ref="`${screen.left}BoxRef`"
                    ></component>
                    <empty-screen v-else></empty-screen>
                </template>
                <template #right>
                    <relate-detail
                        v-if="screen.right && screen.right === 'relateDetail'"
                        screen="right"
                    ></relate-detail>
                    <tree-detail
                        v-else-if="screen.right && screen.right === 'treeDetail'"
                        screen="right"
                    ></tree-detail>
                    <explain-detail
                        v-else-if="screen.right && screen.right === 'explainDetail'"
                        screen="right"
                    ></explain-detail>
                    <component
                        v-else-if="screen.right"
                        :is="realCompoent[screen.right]"
                        :ref="`${screen.right}BoxRef`"
                    ></component>
                    <empty-screen v-else></empty-screen>
                </template>
            </split-screen>
        </main>
    </section>
</template>

<style lang="scss" scoped></style>
