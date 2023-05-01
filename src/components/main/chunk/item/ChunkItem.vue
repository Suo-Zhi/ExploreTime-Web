<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { Chunk } from '@/api/chunk/types';

interface Props {
    item: Chunk;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <!-- 知识块 -->
    <card-fold class="mb-3" :isToggle="false">
        <!-- 标题 -->
        <template #title>
            <!-- 知识块名 -->
            <div class="title py-2">{{ props.item.name }}</div>
        </template>

        <!-- 顶部操作栏 -->
        <template #actions>
            <div class="action-bar mr-2">
                <icon-link-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="关联情况"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                />
                <icon-align-text-top-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="编辑前言"
                />
                <icon-align-text-bottom-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="编辑尾注"
                />
                <icon-hammer-and-anvil
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="转化为知识树"
                />
            </div>
        </template>

        <!-- 知识块主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 知识块前言 -->
            <div
                class="preface ml-2 py-1 rounded-sm relative bg-gradient-to-r from-slate-50 to-blue-50"
            >
                {{ props.item.preface }}
            </div>

            <!-- 知识块内容列表 -->
            <div class="content my-2">
                <chunk-content
                    :item="item"
                    v-for="(item, index) of props.item.content"
                    :key="index"
                ></chunk-content>
            </div>

            <!-- 知识块尾注 -->
            <div
                class="endnote ml-2 py-1 rounded-sm relative bg-gradient-to-r from-slate-50 to-slate-100"
            >
                {{ props.item.endnote }}
            </div>
        </div>

        <!-- 知识块项底部 -->
        <div class="chunk-footer flex justify-between items-center ml-3 mb-2">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>

            <!-- 底部操作栏 -->
            <section class="action-bar mr-2">
                <component
                    :is="props.item.isRefine ? icons['InboxOut'] : icons['InboxIn']"
                    size="17"
                    :strokeWidth="3"
                    :title="props.item.isRefine ? '还需处理' : '处理完成'"
                    class="action-btn hover:text-primary"
                ></component>
                <icon-delete
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-red-600"
                    title="删除"
                />
            </section>
        </div>
    </card-fold>
</template>

<style lang="scss" scoped>
.preface::before {
    content: '';
    width: 2px;
    height: 60%;
    border-radius: 8px;
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    background: $color-secondary;
}
.endnote::before {
    content: '';
    width: 2px;
    height: 60%;
    border-radius: 8px;
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    background: #d8dde0;
}
</style>
