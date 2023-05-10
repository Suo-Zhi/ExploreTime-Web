<script setup lang="ts">
import { SelectOption } from '@/components/base/SelectType.vue';

const { history } = store.square();
const link = computed(() => history.links[history.activeIndex]); // 当前链接信息

const keywords = ref(''); // 搜索关键字
provide('keywords', keywords);

const tab = ref<'sum' | 'knowledge' | 'explain' | 'exercise'>('knowledge'); // 当前激活选项卡

// 筛选
const type = ref('point');
const typeOptions = ref<SelectOption[]>([]);
watch(
    tab,
    () => {
        if (tab.value === 'knowledge') {
            type.value = 'point';
            typeOptions.value = [
                { label: '知识点', value: 'point' },
                { label: '知识块', value: 'chunk' },
                { label: '知识树', value: 'tree' },
            ];
        } else if (tab.value === 'exercise') {
            type.value = 'exercise';
            typeOptions.value = [
                { label: '习题', value: 'exercise' },
                { label: '习题集', value: 'exerciseSet' },
            ];
        }
    },
    { immediate: true }
);
</script>

<template>
    <!-- 关联详情区 -->
    <section class="relate-detail h-full" v-if="link.targetType && link.targetId">
        <a-tabs :active-key="tab" @change="(e:any)=>{tab = e}">
            <!-- 统计数据 -->
            <a-tab-pane key="sum" title="综合">
                <relate-sum :chartId="link.targetId + link.targetType"></relate-sum>
            </a-tab-pane>

            <!-- 关联知识 -->
            <a-tab-pane key="knowledge" title="知识">
                <relate-knowledge-view
                    v-if="tab === 'knowledge'"
                    :type="type"
                ></relate-knowledge-view>
            </a-tab-pane>

            <a-tab-pane key="explain" title="讲解">
                <relate-explain-list-view
                    v-if="tab === 'explain'"
                    :type="type"
                ></relate-explain-list-view>
            </a-tab-pane>
            <a-tab-pane key="exercise" title="习题">Content of Tab Panel 3</a-tab-pane>

            <template #extra>
                <select-type
                    v-if="tab === 'knowledge' || tab === 'exercise'"
                    v-model="type"
                    :options="typeOptions"
                    class="!w-[60px] mr-2"
                ></select-type>
                <search-bar v-model="keywords" class="mr-2"></search-bar>
            </template>
        </a-tabs>
    </section>
</template>

<style lang="scss" scoped>
.relate-detail ::v-deep {
    .arco-tabs-nav-tab {
        height: 30px;
        .arco-tabs-nav-tab-list {
            display: flex;
            align-items: center;
            .arco-tabs-tab {
                padding: 0;
            }
        }
    }
    .arco-tabs-content {
        padding-top: 0;
    }

    .arco-tabs,
    .arco-tabs-content,
    .arco-tabs-content-list,
    .arco-tabs-pane {
        height: 100% !important;
    }
    .arco-tabs-nav::before {
        height: 0px;
    }
}
</style>
