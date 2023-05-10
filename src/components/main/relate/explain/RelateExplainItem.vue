<script setup lang="ts">
import { Explain } from '@/api/explain/types';

interface Props {
    item: Explain;
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
        linkTitle: '讲解关联-' + props.item.title,
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
            relateType: 'explain',
        })
        .then(() => {
            emit('refresh');
        });
};

// 打开树详情
const viewDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'explainDetail',
        linkTitle: '讲解详情-' + props.item.title,
        targetId: props.item.id,
        targetType: 'explain',
    });
    switchHistory('explainDetail');
};
</script>

<template>
    <!-- 讲解项 -->
    <section class="explain-item border-base flex flex-col pt-2 pb-2 mb-2">
        <!-- 顶部 -->
        <div
            class="card-header flex justify-between items-center border-b border-gray-200 pb-[4px] px-3"
        >
            <!-- 讲解名 -->
            <div class="explain-title min-w-[170px]">
                <edit-item
                    type="text"
                    :value="props.item.title"
                    :isEdit="props.isEdit"
                    placeholder="请输入讲解标题"
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
                    @click="openDiscussArea(props.item.id, 'explain')"
                />
                <icon-notes
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看讲解详情"
                    @click="viewDetail"
                />
            </section>
        </div>

        <!-- 中部主体 -->
        <div class="card-body explain-content my-2 px-3">
            <!-- 讲解内容 -->
            <text-view :text="props.item.content" class="!text-gray-600 !line-clamp-2"></text-view>
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
