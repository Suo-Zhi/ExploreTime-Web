<script setup lang="ts">
import { ExerciseSet } from '@/api/exercise/set/types';

interface Props {
    item: ExerciseSet;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

const emit = defineEmits(['refresh']);

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '习题集关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'explain',
    });
    switchHistory('relateDetail');
};

// 取消关联
const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const cancelRelate = async (id: number) => {
    await api.relate
        .delRelate({
            targetId: targetId.value,
            targetType: targetType.value,
            relateId: id,
            relateType: 'exerciseSet',
        })
        .then(() => {
            emit('refresh');
        });
};

// 打开习题集详情
const viewDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'explainDetail',
        linkTitle: '习题集详情-' + props.item.name,
        targetId: props.item.id,
        targetType: 'exerciseSet',
    });
    switchHistory('explainDetail');
};
</script>

<template>
    <!-- 习题集 -->
    <section class="exerciseSet-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 习题集名 -->
            <div class="exerciseSet-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit"
                    placeholder="请输入习题集名"
                ></edit-item>
            </div>
            <!-- 拖拽手柄 -->
            <div class="drag-handle">&nbsp;</div>
            <!-- 顶部操作栏 -->
            <section class="action-bar">
                <icon-notes
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看习题集详情"
                    @click="viewDetail"
                />
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'exerciseSet')"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body exercise-content my-2 px-3">
            <!-- 习题集前言 -->
            <div class="preface">
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit"
                    placeholder="请输入习题集前言"
                ></edit-item>
            </div>
        </div>

        <!-- 尾部 -->
        <div class="card-footer flex justify-between px-3">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>
            <!-- 底部操作栏 -->
            <section class="action-bar">
                <icon-unlink
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="取消关联"
                    @click="cancelRelate(item.id)"
                />
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
