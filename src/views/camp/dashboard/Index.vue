<script setup lang="ts"></script>

<template>
    <div class="dashboard w-full h-full flex flex-col px-2">
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
                <!-- 类型切换器 -->
                <a-radio-group
                    defaultValue="info"
                    type="button"
                    class="w-full flex justify-between mb-2 !bg-slate-100"
                >
                    <a-radio value="info" class="flex-1 text-center !m-1">有效信息</a-radio>
                    <a-radio value="point" class="flex-1 text-center !m-1">知识点</a-radio>
                    <a-radio value="chunk" class="flex-1 text-center !m-1">知识块</a-radio>
                    <a-radio value="tree" class="flex-1 text-center !m-1">知识树</a-radio>
                    <a-radio value="explain" class="flex-1 text-center !m-1">讲解</a-radio>
                    <a-radio value="exercise" class="flex-1 text-center !m-1">习题</a-radio>
                </a-radio-group>
                <!-- 曲线图 -->
                <section class="line-chart flex-1 max-h-[90%]"><line-chart></line-chart></section>
            </div>
            <!-- 右侧面板 -->
            <div class="col-span-1 mb-2 flex flex-col justify-between">
                <!-- 时间切换器 -->
                <a-radio-group
                    defaultValue="day"
                    type="button"
                    class="flex justify-between mb-2 !bg-slate-100"
                >
                    <a-radio value="day" class="flex-1 text-center !m-1">日</a-radio>
                    <a-radio value="week" class="flex-1 text-center !m-1">周</a-radio>
                    <a-radio value="month" class="flex-1 text-center !m-1">月</a-radio>
                    <a-radio value="year" class="flex-1 text-center !m-1">年</a-radio>
                </a-radio-group>
                <!-- 额外输出面板 -->
                <section class="flex-1 bg-slate-100 rounded-md p-3 mb-2">
                    <data-card
                        icon="Notes"
                        iconColor="text-primary"
                        title="今日新增讲解数"
                        theme="outline"
                        :data="{ firstData: 1, secondData: 1 }"
                    ></data-card>
                    <data-card
                        icon="DocumentFolder"
                        iconColor="text-primary"
                        title="今日新增习题数"
                        theme="outline"
                        class="mt-2"
                        :data="{ firstData: 10, secondData: 5 }"
                    ></data-card>
                </section>
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
