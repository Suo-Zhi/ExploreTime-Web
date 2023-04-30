<script setup lang="ts">
interface Props {
    chartId: string;
}
const props = withDefaults(defineProps<Props>(), {});

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

const seriesOtherOptions = {
    type: 'line',
    smooth: true,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 10,
    emphasis: {
        focus: 'series',
        itemStyle: {
            borderWidth: 2,
            borderColor: '#E0E3FF',
        },
    },
};

const options = {
    grid: {
        left: '40',
        right: '20',
        top: '10',
        bottom: '60',
    },

    xAxis: {
        type: 'category',
        data: xData(),
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#A9AEB8',
            },
        },
        axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
                color: '#86909C',
            },
        },
        axisLabel: {
            color: '#86909C',
        },
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#86909C',
            formatter: '{value}%',
        },
        splitLine: {
            lineStyle: {
                color: '#E5E6EB',
            },
        },
    },
    tooltip: {
        show: true,
        trigger: 'axis',
        className: 'echarts-tooltip-diy',
    },
    series: [
        {
            name: '知识点',
            data: yData(),
            color: '#246EFF',
            ...seriesOtherOptions,
        },
        {
            name: '知识块',
            data: yData(),
            color: '#00B2FF',
            ...seriesOtherOptions,
        },
        {
            name: '知识树',
            data: yData(),
            color: '#81E2FF',
            ...seriesOtherOptions,
        },
        {
            name: '讲解',
            data: yData(),
            color: '#81E2AA',
            ...seriesOtherOptions,
        },
        {
            name: '习题',
            data: yData(),
            color: '#81E233',
            ...seriesOtherOptions,
        },
    ],
};
</script>

<template>
    <!-- 时段分析 -->
    <chart-base
        :chartId="`period-chart${props.chartId}`"
        :options="options"
        class="w-full h-[450px]"
    ></chart-base>
</template>

<style lang="scss" scoped></style>
