<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { Info } from '@/api/info/types';

interface Props {
    item: Info;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

// 移除
const removeHandle = async () => {
    await api.info.remove(props.item.id).then(() => {
        props.item.isDel = true;
    });
};

// 归档
const toggleRefineHandle = async () => {
    await api.info.toggleRefine(props.item.id, !props.item.isRefine).then(() => {
        props.item.isRefine = !props.item.isRefine;
    });
};

// 编辑完成后需进行的处理
const emit = defineEmits(['active', 'blur', 'update', 'refine']);
const editEndHandle = (newValue: string) => {
    // 判空
    if (tool.isEmpty(newValue, '有效信息')) return;
    // 判断值是否变动
    if (newValue === props.item.content) return emit('blur');

    // 调用更新事件
    emit('update', newValue);
};
</script>

<template>
    <!-- 有效信息项 -->
    <section class="info-item border-base p-3 pb-2 mb-2">
        <!-- 有效信息内容 -->
        <edit-item
            :value="item.content"
            :isEdit="props.isEdit"
            placeholder="输入有效信息..."
            @editStart="$emit('active')"
            @editEnd="editEndHandle"
        ></edit-item>

        <!-- 卡片底部 -->
        <div class="card-footer flex justify-between items-center mt-[4px]">
            <time-bar :createTime="item.createTime" :updateTime="item.updateTime"></time-bar>
            <!-- 操作项 -->
            <section class="action-bar">
                <icon-hammer-and-anvil
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="提炼"
                    @click="$emit('refine')"
                />
                <component
                    :is="item.isRefine ? icons['InboxOut'] : icons['InboxIn']"
                    size="17"
                    :strokeWidth="3"
                    :title="item.isRefine ? '还需处理' : '处理完成'"
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
