<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { IconType } from '@icon-park/vue-next/lib/all';

interface Props {
    icon: IconType;
    iconColor: string;
    title: string;
    data: {
        firstData: number;
        secondData: number;
    };
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <section
        class="today-data-card shadow-md px-3 h-[100px] rounded-md flex justify-center items-center bg-white"
    >
        <div class="icon-box h-full flex flex-col justify-center">
            <component
                theme="filled"
                :is="icons[props.icon]"
                size="50"
                :strokeWidth="2"
                :class="props.iconColor"
            />
        </div>
        <div class="desc ml-3 flex flex-col">
            <!-- 数据标题 -->
            <span class="title text-gray-600">{{ props.title }}</span>
            <div class="mt-3 text-center flex justify-center items-end">
                <!-- 数据值 -->
                <span class="data text-[36px] mr-1 text-gray-700 leading-[34px]">
                    {{ props.data.firstData }}
                </span>
                <div class="flex items-center">
                    <!-- 单位 -->
                    <span class="unit text-gray-600 text-[12px]">个</span>
                    <!-- 趋势 -->
                    <span class="trend">
                        <trend-arrow
                            :firstData="props.data.firstData"
                            :secondData="props.data.secondData"
                            secondTitle="昨日"
                        ></trend-arrow>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
