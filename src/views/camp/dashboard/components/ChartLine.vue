<script setup lang="ts">
import { ToolTipFormatterParams } from '@/components/base/ChartBase.vue';

const xData = () => {
    let data = [];
    for (let i = 7; i > 0; i--) {
        data.push(tool.formateTime(new Date().getTime() - i * 24 * 60 * 60 * 1000, 'MM-DD'));
    }
    return data;
};

const yData = () => {
    let data = [];
    for (let i = 7; i > 0; i--) {
        data.push(Math.floor(Math.random() * 20 + 5));
    }
    return data;
};

const options = {
    grid: { left: '25', right: '25', top: '10', bottom: '25' }, // 防止图表边缘被遮挡
    xAxis: {
        type: 'category',
        offset: 2,
        data: xData(),
        boundaryGap: false,
        axisLabel: { color: '#4E5969' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: '#E5E8EF' } },
        axisPointer: { show: true, lineStyle: { color: '#23ADFF', width: 2 } },
    },
    yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: {},
        splitLine: { show: true, lineStyle: { type: 'dashed', color: '#E5E8EF' } },
    },
    tooltip: {
        trigger: 'axis',
        formatter(params: [ToolTipFormatterParams]) {
            const [firstElement] = params;
            return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
                Number(firstElement.value) * 10000
            ).toLocaleString()}</span></div>
          </div>`;
        },
        className: 'echarts-tooltip-diy',
    },
    series: [
        {
            data: yData(),
            type: 'line',
            smooth: true,
            symbolSize: 12,
            emphasis: { focus: 'series', itemStyle: { borderWidth: 2 } },
            lineStyle: {
                width: 3,
                color: {
                    colorStops: [
                        { offset: 0, color: 'rgba(30, 231, 255, 1)' },
                        { offset: 0.5, color: 'rgba(36, 154, 255, 1)' },
                        { offset: 1, color: 'rgba(111, 66, 251, 1)' },
                    ],
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                },
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: {
                    colorStops: [
                        { offset: 0, color: 'rgba(17, 126, 255, 0.16)' },
                        { offset: 1, color: 'rgba(17, 128, 255, 0)' },
                    ],
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                },
            },
        },
    ],
};
</script>

<template>
    <chart-base chartId="line-chart" :options="options" class="w-full h-full"></chart-base>
</template>

<style lang="scss" scoped></style>
