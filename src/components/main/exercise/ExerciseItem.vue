<script setup lang="ts">
import { Exercise } from '@/api/exercise/types';
import * as icons from '@icon-park/vue-next';

interface Props {
    item: Exercise;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 移除
const removeHandle = async () => {
    await api.exercise.remove(props.item.id).then(() => {
        props.item.isDel = true;
    });
};

// 归档
const toggleRefineHandle = async () => {
    await api.exercise.toggleRefine(props.item.id, !props.item.isRefine).then(() => {
        props.item.isRefine = !props.item.isRefine;
    });
};

const emit = defineEmits(['active', 'blur', 'update', 'refresh']);

// 编辑前处理
const newValue = ref({ question: '', detail: '', answer: '', analysis: '' }); // 新值
const editTarget = ref('question'); // 编辑目标: 默认为all在新增时才能同时编辑名和内容
const editStartHandle = (target: 'question' | 'detail' | 'answer' | 'analysis') => {
    // 该项切换至激活状态
    emit('active');
    // 同步值
    newValue.value.question = props.item.question;
    newValue.value.detail = props.item.detail;
    newValue.value.answer = props.item.answer;
    newValue.value.analysis = props.item.analysis;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = () => {
    // 判空
    if (tool.isEmpty(newValue.value.question, '问题', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.question === props.item.question &&
        newValue.value.detail === props.item.detail &&
        newValue.value.answer === props.item.answer &&
        newValue.value.analysis === props.item.analysis
    )
        return emit('blur');

    // 调用新增或更新事件
    if (props.item.id === -1) create();
    else emit('update', newValue.value);
};

// 新增习题
const create = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.question, '问题', 'text')) return;

    await api.exercise.create(newValue.value).then(() => {
        emit('refresh');
    });
    emit('blur');
};

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
</script>

<template>
    <!-- 习题项 -->
    <section class="exercise-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 习题名 -->
            <div class="exercise-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.question"
                    :isEdit="props.isEdit && editTarget === 'question'"
                    @editStart="editStartHandle('question')"
                    @changeValue="newValue.question = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入习题名"
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
                    :value="props.item.detail"
                    :isEdit="props.isEdit && editTarget === 'detail'"
                    @editStart="editStartHandle('detail')"
                    @changeValue="newValue.detail = $event"
                    @editEnd="editEndHandle"
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
                        :value="props.item.answer"
                        :isEdit="props.isEdit && editTarget === 'answer'"
                        @editStart="editStartHandle('answer')"
                        @changeValue="newValue.answer = $event"
                        @editEnd="editEndHandle"
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
                        :value="props.item.analysis"
                        :isEdit="props.isEdit && editTarget === 'analysis'"
                        @editStart="editStartHandle('analysis')"
                        @changeValue="newValue.analysis = $event"
                        @editEnd="editEndHandle"
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
