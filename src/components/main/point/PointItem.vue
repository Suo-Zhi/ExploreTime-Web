<script setup lang="ts">
import { Point } from '@/api/point/types';
import * as icons from '@icon-park/vue-next';

interface Props {
    item: Point;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

// 移除
const refreshChunkBox = inject<any>('refreshChunkBox');
const removeHandle = async () => {
    await api.point
        .remove(props.item.id)
        .then(() => {
            props.item.isDel = true;
        })
        .then(() => {
            // 刷新块列表(这里不太合理: 应该当知识块列表存在该知识点时刷新单独块,以后改)
            refreshChunkBox();
        });
};

// 归档
const toggleRefineHandle = async () => {
    await api.point.toggleRefine(props.item.id, !props.item.isRefine).then(() => {
        props.item.isRefine = !props.item.isRefine;
    });
};

const emit = defineEmits(['active', 'blur', 'update', 'refresh']);

// 编辑前处理
const newValue = ref({ name: '', content: '' }); // 新值
const editTarget = ref('all'); // 编辑目标: 默认为all在新增时才能同时编辑名和内容
const editStartHandle = (target: 'all' | 'name' | 'content') => {
    // 该项切换至激活状态
    emit('active');
    // 同步值
    newValue.value.name = props.item.name;
    newValue.value.content = props.item.content;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识点名', 'text')) return;
    // 判断值是否变动
    if (newValue.value.name === props.item.name && newValue.value.content === props.item.content)
        return emit('blur');

    // 调用新增或更新事件
    if (props.item.id === -1) create();
    else emit('update', newValue.value);
};

// 新增知识点
const create = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识点名', 'text')) return;

    await api.point.create(newValue.value).then(() => {
        emit('refresh');
    });
    emit('blur');
};

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '点关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'point',
    });
    switchHistory('relateDetail');
};
</script>

<template>
    <!-- 知识点项 -->
    <section class="point-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识点名 -->
            <div class="point-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit && (editTarget === 'name' || editTarget === 'all')"
                    @editStart="editStartHandle('name')"
                    @changeValue="newValue.name = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识点名"
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
                    title="查看关联项"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看反馈"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识点内容 -->
            <edit-item
                :value="props.item.content"
                :isEdit="props.isEdit && (editTarget === 'content' || editTarget === 'all')"
                @editStart="editStartHandle('content')"
                @changeValue="newValue.content = $event"
                @editEnd="editEndHandle"
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
