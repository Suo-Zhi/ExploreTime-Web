<script setup lang="ts">
import { Point } from '@/api/point/types';

interface Props {
    item: Point;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['refresh', 'active', 'blur', 'update']);

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

// 取消关联
const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const cancelRelate = async (id: number) => {
    await api.relate
        .delRelate({
            targetId: targetId.value,
            targetType: targetType.value,
            relateId: id,
            relateType: 'point',
        })
        .then(() => {
            emit('refresh');
        });
};

// 编辑前处理
const newValue = ref({ name: '', content: '' }); // 新值
const editTarget = ref('name'); // 编辑目标
const editStartHandle = (target: 'name' | 'content') => {
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
    emit('update', newValue.value);
};

const { openDiscussArea } = store.square(); // 打开讨论区
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
                    @click="openDiscussArea(item.id, 'point')"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body point-content my-2 px-3">
            <!-- 知识点内容 -->
            <edit-item
                :value="props.item.content"
                :isEdit="props.isEdit && editTarget === 'content'"
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
