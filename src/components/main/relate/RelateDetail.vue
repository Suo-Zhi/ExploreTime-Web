<script setup lang="ts">
interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});

const { history } = store.setting();

const targetId = ref(); // 关联源目标Id
const targetType = ref(); // 关联源目标类型

// 同步关联源目标值
const activeIndex = computed(() => history.activeIndex[props.screen]);
watch(
    activeIndex,
    () => {
        if (activeIndex.value !== -1 && history.links[activeIndex.value]) {
            targetId.value = history.links[activeIndex.value].targetId;
            targetType.value = history.links[activeIndex.value].targetType;
        }
    },
    { immediate: true }
);

const tab = ref<'sum' | 'knowledge' | 'explain' | 'exercise'>('explain');
</script>

<template>
    <!-- 关联详情区 -->
    <section class="relate-detail" v-if="targetType && targetId">
        <a-tabs :active-key="tab" @change="tab = $event as any">
            <a-tab-pane key="sum" title="综合">
                <relate-sum :chartId="props.screen + targetId + targetType"></relate-sum>
            </a-tab-pane>
            <a-tab-pane key="knowledge" title="知识"></a-tab-pane>
            <a-tab-pane key="explain" title="讲解">Content of Tab Panel 3</a-tab-pane>
            <a-tab-pane key="exercise" title="习题">Content of Tab Panel 3</a-tab-pane>
        </a-tabs>
    </section>
</template>

<style lang="scss" scoped>
.relate-detail {
    ::v-deep .arco-tabs-nav-tab {
        height: 30px;
        .arco-tabs-nav-tab-list {
            display: flex;
            align-items: center;
            .arco-tabs-tab {
                padding: 0;
            }
        }
    }
    ::v-deep .arco-tabs-content {
        padding-top: 0;
    }
}
</style>
