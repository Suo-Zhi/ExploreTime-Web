<script setup lang="ts">
import { Point } from '@/api/point/types';
import * as icons from '@icon-park/vue-next';

interface Props {
    item: Point;
    isEdit: {
        name: boolean;
        content: boolean;
    };
}
const props = withDefaults(defineProps<Props>(), {});

// 移除
const removeHandle = async () => {
    await api.point.remove(props.item.id).then(() => {
        props.item.isDel = true;
    });
};

// 归档
const toggleRefineHandle = async () => {
    await api.point.toggleRefine(props.item.id, !props.item.isRefine).then(() => {
        props.item.isRefine = !props.item.isRefine;
    });
};
</script>

<template>
    <!-- 知识点项 -->
    <section
        class="point-card flex flex-col border border-gray-200 rounded-sm pt-2 pb-2 mb-2 hover:shadow-md duration-300"
    >
        <!-- 顶部 -->
        <section
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识点名 -->
            <div class="point-title">
                <edit-item
                    :value="props.item.name"
                    :isEdit="props.isEdit.name"
                    placeholder="请输入知识点名"
                ></edit-item>
            </div>
            <!-- 顶部操作栏 -->
            <section class="action-bar">
                <icon-link
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联项"
                />
                <icon-comment
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看反馈"
                />
            </section>
        </section>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识点内容 -->
            <edit-item
                :value="props.item.content"
                :isEdit="props.isEdit.content"
                placeholder="请输入知识点内容"
            ></edit-item>
        </div>

        <!-- 尾部 -->
        <div class="card-footer flex justify-between px-3">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>
            <!-- 底部操作栏 -->
            <section class="action-bar">
                <component
                    :is="props.item.isRefine ? icons['InboxOut'] : icons['InboxIn']"
                    size="17"
                    :strokeWidth="3"
                    :title="props.item.isRefine ? '还需处理' : '处理完成'"
                    class="action-btn hover:text-primary"
                    @click="toggleRefineHandle"
                ></component>
                <icon-delete
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-red-600"
                    title="删除"
                    @click="removeHandle"
                />
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
