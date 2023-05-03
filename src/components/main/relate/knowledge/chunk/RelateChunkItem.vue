<script setup lang="ts">
import { Chunk } from '@/api/chunk/types';

interface Props {
    item: Chunk;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['refresh']);

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '块关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'chunk',
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
            relateType: 'chunk',
        })
        .then(() => {
            emit('refresh');
        });
};

const activeIndex = ref(-1);
</script>
<template>
    <!-- 知识块 -->
    <card-fold class="mb-3" :isToggle="false">
        <!-- 标题 -->
        <template #title>
            <!-- 知识块名 -->
            <edit-item
                type="text"
                :value="props.item.name"
                :isEdit="props.isEdit"
                placeholder="请输入知识块名"
                class="title py-2 w-[200px]"
            ></edit-item>
            <!-- 拖拽手柄 -->
            <div class="drag-handle">&nbsp;</div>
        </template>

        <!-- 顶部操作栏 -->
        <template #actions>
            <div class="action-bar mr-2">
                <icon-link-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                />
            </div>
        </template>

        <!-- 知识块主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 知识块前言 -->
            <div
                class="preface ml-2 py-1 pl-1 rounded-sm relative bg-gradient-to-r from-slate-50 to-blue-50"
            >
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit"
                    placeholder="请输入知识块前言"
                ></edit-item>
            </div>

            <!-- 知识块内容列表 -->
            <div class="content my-1">
                <add-line></add-line>
                <chunk-content
                    v-for="(item, index) of props.item.content"
                    v-show="!item.isDel"
                    :item="item"
                    :isEdit="activeIndex === index"
                ></chunk-content>
            </div>

            <!-- 知识块尾注 -->
            <div
                class="endnote ml-2 py-1 pl-1 rounded-sm relative bg-gradient-to-r from-slate-50 to-slate-100"
            >
                <edit-item
                    :value="props.item.endnote"
                    :isEdit="props.isEdit"
                    placeholder="请输入知识块尾注"
                ></edit-item>
            </div>
        </div>

        <!-- 知识块项底部 -->
        <div class="chunk-footer flex justify-between items-center ml-3 mb-2">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>

            <!-- 底部操作栏 -->
            <section class="action-bar mr-2">
                <icon-unlink
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="取消关联"
                    @click="cancelRelate(item.id)"
                />
            </section>
        </div>
    </card-fold>
</template>

<style lang="scss" scoped></style>
