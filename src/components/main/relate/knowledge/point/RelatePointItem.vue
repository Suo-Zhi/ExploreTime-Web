<script setup lang="ts">
import { Point } from '@/api/point/types';

interface Props {
    item: Point;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

// 编辑目标
const editTarget = ref<'name' | 'content'>('name');

// 新值
const newValue = ref({
    // 别直接等于props
    name: '',
    content: '',
});

const emit = defineEmits(['active', 'blur', 'update', 'refresh']);

// 编辑完成后需进行的处理
const editEndHandle = () => {
    // 补全未修改的值
    if (editTarget.value === 'name') newValue.value.content = props.item.content;
    else if (editTarget.value === 'content') newValue.value.name = props.item.name;
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识点名', 'text')) return (newValue.value.content = '');
    // 调用更新事件
    emit('update', newValue.value);
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
    <section
        class="point-item flex flex-col border border-gray-200 rounded-sm pt-2 pb-2 mb-2 hover:shadow-md duration-300"
    >
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 知识点名 -->
            <div class="point-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.name"
                    :isEdit="props.isEdit && editTarget === 'name'"
                    @editStart="
                        $emit('active');
                        editTarget = 'name';
                    "
                    @changeValue="newValue.name = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识点名"
                ></edit-item>
            </div>
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
                :isEdit="props.isEdit && editTarget === 'content'"
                @editStart="
                    $emit('active');
                    editTarget = 'content';
                "
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
                <icon-unlink
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="取消关联"
                    @click="viewRelateDetail"
                />
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>