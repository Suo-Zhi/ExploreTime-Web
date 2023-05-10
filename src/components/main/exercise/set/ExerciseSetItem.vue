<script setup lang="ts">
import { ExerciseSet } from '@/api/exercise/set/types';

interface Props {
    item: ExerciseSet;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const { openDiscussArea } = store.square(); // 打开讨论区

// 移除
const removeHandle = async () => {
    await api.exerciseSet.remove(props.item.id).then(() => {
        props.item.isDel = true;
    });
};

// 公开
const togglePublicHandle = async () => {
    await api.exerciseSet.togglePublic(props.item.id, !props.item.isPublic).then(() => {
        props.item.isPublic = !props.item.isPublic;
    });
};

const emit = defineEmits(['active', 'blur', 'update', 'refresh']);

// 编辑前处理
const newValue = ref({ name: '', preface: '' }); // 新值
const editTarget = ref('name'); // 编辑目标
const editStartHandle = (target: 'name' | 'preface') => {
    // 该项切换至激活状态
    emit('active');
    // 同步值
    newValue.value.name = props.item.name;
    newValue.value.preface = props.item.preface;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '习题集名', 'text')) return;
    // 判断值是否变动
    if (newValue.value.name === props.item.name && newValue.value.preface === props.item.preface)
        return emit('blur');

    // 调用新增或更新事件
    if (props.item.id === -1) create();
    else emit('update', newValue.value);
};

// 新增习题集
const create = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '习题集名', 'text')) return;

    await api.exerciseSet.create(newValue.value).then(() => {
        emit('refresh');
    });
    emit('blur');
};

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '习题集关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'exerciseSet',
    });
    switchHistory('relateDetail');
};

// 打开习题集详情
const viewDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'exerciseSetDetail',
        linkTitle: '习题集详情-' + props.item.name,
        targetId: props.item.id,
        targetType: 'exerciseSet',
    });
    switchHistory('exerciseSetDetail');
};
</script>

<template>
    <!-- 习题集 -->
    <section class="tree-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识树名 -->
            <div class="tree-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit && (editTarget === 'name' || editTarget === 'all')"
                    @editStart="editStartHandle('name')"
                    @changeValue="newValue.name = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识树名"
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
                    title="查看关联项"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(props.item.id, 'exerciseSet')"
                />
                <lock-button
                    :isPublic="props.item.isPublic"
                    @click="togglePublicHandle"
                ></lock-button>
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识树前言 -->
            <div class="preface">
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit && (editTarget === 'preface' || editTarget === 'all')"
                    @editStart="editStartHandle('preface')"
                    @changeValue="newValue.preface = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识树前言"
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
