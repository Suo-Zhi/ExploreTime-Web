<script setup lang="ts">
import { ChunkContent } from '@/api/chunk/types';

interface Props {
    item: ChunkContent;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['active', 'blur', 'updateContent', 'refresh']);

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

    // 调用更新事件
    emit('updateContent', newValue.value);
};
</script>

<template>
    <section class="chunk-content-item">
        <card-fold :line="false" :border="false">
            <template #title>
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit && editTarget === 'name'"
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
                        class="cursor-pointer hover:text-red-600"
                        title="移出"
                    />
                </div>
            </template>

            <div class="point-content border-t text-[14px] mx-2 py-1">
                <edit-item
                    :value="props.item.content"
                    :isEdit="props.isEdit && editTarget === 'content'"
                    @editStart="editStartHandle('content')"
                    @changeValue="newValue.content = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识点内容"
                ></edit-item>
            </div>
        </card-fold>

        <add-line></add-line>
    </section>
    <!-- 知识块内容项 -->
</template>

<style lang="scss" scoped></style>
