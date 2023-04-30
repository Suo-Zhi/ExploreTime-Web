<script setup lang="ts">
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

interface Props {
    chartId: string;
    options: EChartsOption;
}

const props = withDefaults(defineProps<Props>(), {});

// 基础配置
const option = ref(props.options);

// 绘制图表
let echart: any = null;
const onDraw = () => {
    const container = document.getElementById(props.chartId);
    if (!container) return;

    echart = echarts.init(container, undefined, {
        renderer: 'svg',
    });

    echart.setOption(option.value);
};

// 在挂载 DOM 之后再渲染 ECharts 图
onMounted(() => {
    onDraw();
});
// 在卸载组建时销毁 ECharts 实例
onUnmounted(() => {
    echart?.dispose();
});

// 数据刷新重绘
watch(option, () => {
    echart.dispose();
    onDraw();
});
</script>

<script lang="ts">
import { CallbackDataParams } from 'echarts/types/dist/shared';

export interface ToolTipFormatterParams extends CallbackDataParams {
    axisDim: string;
    axisIndex: number;
    axisType: string;
    axisId: string;
    axisValue: string;
    axisValueLabel: string;
}
</script>

<template>
    <div class="chart-box" :id="props.chartId"></div>
</template>

<style lang="scss" scoped></style>
