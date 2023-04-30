<script setup lang="ts">
interface Props {
    chartId: string;
}
const props = withDefaults(defineProps<Props>(), {});

const getData = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
        data.push(Math.floor(Math.random() * 20 + 5));
    }
    return data;
};
const data = getData();

const options = {
    grid: {
        top: '0',
    },
    tooltip: { trigger: 'item' },
    legend: {
        orient: 'vertical',
        left: '15%',
        top: 'center',
        itemWidth: 50,
        itemHeight: 20,
    },
    // 自定义标题
    graphic: {
        elements: [
            {
                type: 'text',
                left: '65%',
                top: '40%',
                style: {
                    text: '总关联数',
                    textAlign: 'center',
                    fill: '#4E5969',
                    fontSize: 16,
                },
            },
            {
                type: 'text',
                left: '67%',
                top: '51%',
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
            name: '关联数',
            type: 'pie',
            radius: ['60%', '90%'],
            center: ['70%', '50%'],
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
                { value: data[0], name: '知识点', itemStyle: { color: '#246EFF' } },
                { value: data[1], name: '知识块', itemStyle: { color: '#00B2FF' } },
                { value: data[2], name: '知识树', itemStyle: { color: '#81E2FF' } },
                { value: data[3], name: '讲解', itemStyle: { color: '#81E2AA' } },
                { value: data[4], name: '习题', itemStyle: { color: '#81E233' } },
            ],
        },
    ],
};
</script>

<template>
    <chart-base
        :chartId="`ring-chart${props.chartId}`"
        :options="options"
        class="w-full h-[234px]"
    ></chart-base>
</template>

<style lang="scss" scoped></style>
