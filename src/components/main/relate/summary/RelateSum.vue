<script setup lang="ts">
interface Props {
    chartId: string;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <!-- 关联情况总结 -->
    <section class="relate-summary h-full px-2 flex flex-col">
        <div class="top">
            <chart-ring :chartId="props.chartId"></chart-ring>
        </div>
        <div class="bottom">
            <chart-period :chartId="props.chartId"></chart-period>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
