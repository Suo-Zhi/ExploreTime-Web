<script setup lang="ts">
const options = {
    tooltip: { trigger: 'item' },
    legend: { left: 'center' },
    // 自定义标题
    graphic: {
        elements: [
            {
                type: 'text',
                left: 'center',
                top: '50%',
                style: {
                    text: '总输出量',
                    textAlign: 'center',
                    fill: '#4E5969',
                    fontSize: 16,
                },
            },
            {
                type: 'text',
                left: 'center',
                top: '60%',
                style: {
                    text: '310',
                    textAlign: 'center',
                    fill: '#1D2129',
                    fontSize: 22,
                    fontWeight: 500,
                },
            },
        ],
    },

    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['56%', '86%'],
            center: ['50%', '58%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: false, // 关闭变化中心
                    fontSize: 40,
                    fontWeight: 'bold',
                },
            },
            data: [
                { value: 110, name: '有效信息', itemStyle: { color: '#7BE188' } },
                { value: 80, name: '知识点', itemStyle: { color: '#7BC0FC' } },
                { value: 40, name: '知识块', itemStyle: { color: '#3491FA' } },
                { value: 10, name: '知识树', itemStyle: { color: '#165DFF' } },
                { value: 20, name: '讲解', itemStyle: { color: '#FF9A2E' } },
                { value: 50, name: '习题', itemStyle: { color: '#FBE842' } },
            ],
        },
    ],
};
</script>

<template>
    <chart-base chartId="doughnut-chart" :options="options" class="w-full h-full"></chart-base>
</template>

<style lang="scss" scoped></style>
