<script setup lang="ts"></script>

<template>
    <div class="dashboard h-full flex flex-col">
        <!-- 顶部面板 -->
        <div class="top-panel my-2 flex">
            <!-- 知识输出统计面板 -->
            <section
                class="knowledge-board flex-1 w-full grid grid-flow-col gap-3 items-stretch bg-slate-100 rounded-md p-3"
            >
                <data-card
                    icon="Inbox"
                    iconColor="text-primary"
                    title="今日收集信息数"
                    :data="{ firstData: 20, secondData: 10 }"
                ></data-card>
                <data-card
                    icon="ListTwo"
                    iconColor="text-primary"
                    title="今日提炼知识点数"
                    :data="{ firstData: 10, secondData: 15 }"
                ></data-card>
                <data-card
                    icon="TreeList"
                    iconColor="text-primary"
                    title="今日归纳知识块数"
                    :data="{ firstData: 5, secondData: 1 }"
                ></data-card>
                <data-card
                    icon="ChristmasTree"
                    iconColor="text-primary"
                    title="今日组合知识树数"
                    :data="{ firstData: 1, secondData: 1 }"
                ></data-card>
            </section>
        </div>
        <!-- 底部面板 -->
        <div class="bottom-panel flex-1 grid grid-cols-4">
            <!-- 左侧面板 -->
            <div class="col-span-3 rounded-md pr-3 mb-2 flex flex-col justify-between">
                <div class="h-[150px]"></div>
                <!-- 曲线图 -->
                <section class="line-chart flex-1"><line-chart></line-chart></section>
            </div>
            <!-- 右侧面板 -->
            <div class="col-span-1 mb-2 flex flex-col justify-between">
                <section class="flex-1 bg-slate-100 rounded-md p-3"></section>
                <!-- 环形图 -->
                <section class="doughnut-chart h-72"><doughnut-chart></doughnut-chart></section>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.arco-radio-button::before {
    background-color: transparent !important;
}
</style>
