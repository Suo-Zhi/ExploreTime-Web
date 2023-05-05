<script setup lang="ts">
import { ChunkContent } from '@/api/chunk/types';

interface Props {
    item: ChunkContent;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['active', 'blur', 'update', 'refresh', 'remove', 'create', 'add']);

// 编辑前处理
const newValue = ref({ name: '', content: '' }); // 新值
const editTarget = ref('all'); // 编辑目标: 默认为all在新增时才能同时编辑名和内容
const editStartHandle = (target: 'all' | 'name' | 'content' = 'all') => {
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

// 新增块内容
const refreshPointBox = inject<any>('refreshPointBox');
const create = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识点名', 'text')) return;
    // 新增知识点
    await api.point.create(newValue.value).then((res) => {
        // 刷新知识点列表
        refreshPointBox();
        // 同步点,用于新增块内容
        props.item.id = res.data.id;
        props.item.name = res.data.name;
        props.item.content = res.data.content;
        // 调用新增块内容事件
        emit('create');
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
    <section class="chunk-content-item">
        <card-fold :line="false" :border="false">
            <template #title>
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit && (editTarget === 'name' || editTarget === 'all')"
                    @editStart="editStartHandle('name')"
                    @changeValue="newValue.name = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识点名"
                    class="title py-1 text-[14px] leading-[14px] w-[200px]"
                ></edit-item>
                <!-- 拖拽手柄 -->
                <div class="drag-handle">&nbsp;</div>
            </template>

            <template #actions>
                <div class="action-bar">
                    <icon-link-one
                        size="16"
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
                    <icon-reduce
                        size="16"
                        :strokeWidth="3"
                        class="action-btn hover:text-red-600"
                        title="移出"
                        @click="$emit('remove')"
                    />
                </div>
            </template>

            <div class="point-content border-t text-[14px] mx-2 py-1">
                <edit-item
                    :value="props.item.content"
                    :isEdit="props.isEdit && (editTarget === 'content' || editTarget === 'all')"
                    @editStart="editStartHandle('content')"
                    @changeValue="newValue.content = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识点内容"
                ></edit-item>
            </div>
        </card-fold>

        <add-line @add="$emit('add', props.item.order + 1)"></add-line>
    </section>
    <!-- 知识块内容项 -->
</template>

<style lang="scss" scoped></style>
