<script setup lang="ts">
import { Exercise } from '@/api/exercise/types';

interface Props {
    item: Exercise;
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
        linkTitle: '习题关联-' + props.item.question,
        targetId: props.item.id,
        targetType: 'exercise',
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
            relateType: 'exercise',
        })
        .then(() => {
            emit('refresh');
        });
};
</script>

<template>
    <!-- 习题项 -->
    <section class="exercise-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 问题 -->
            <div class="exercise-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.question"
                    :isEdit="props.isEdit"
                    placeholder="请输入问题"
                ></edit-item>
            </div>
            <!-- 拖拽手柄 -->
            <div class="drag-handle">&nbsp;</div>
            <!-- 顶部操作栏 -->
            <section class="action-bar">
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'exercise')"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body exercise-content my-2">
            <!-- 问题详情 -->
            <div class="preface mr-2">
                <edit-item
                    type="text"
                    :value="props.item.detail"
                    :isEdit="props.isEdit"
                    placeholder="请详细描述问题"
                ></edit-item>
            </div>

            <!-- 参考回答 -->
            <card-fold :default="true" :line="false" :border="false">
                <template #title>
                    <span class="my-2 text-slate-700">参考回答</span>
                </template>
                <div class="pl-[26px]">
                    <edit-item
                        type="text"
                        :value="props.item.answer"
                        :isEdit="props.isEdit"
                        placeholder="请输入参考回答"
                    ></edit-item>
                </div>
            </card-fold>

            <!-- 习题解析 -->
            <card-fold :default="true" :line="false" :border="false">
                <template #title>
                    <span class="my-2 text-slate-700">习题解析</span>
                </template>
                <div class="pl-[26px]">
                    <edit-item
                        type="text"
                        :value="props.item.analysis"
                        :isEdit="props.isEdit"
                        placeholder="请输入习题解析"
                    ></edit-item>
                </div>
            </card-fold>
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
