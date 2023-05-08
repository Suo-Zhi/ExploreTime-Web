<script setup lang="ts">
const { discuss } = store.square();
const drawerWidth = screen.availWidth / 3; // 讨论区宽度

const keywords = ref('');
</script>

<template>
    <!-- 反馈区 -->
    <a-drawer
        :visible="discuss.isShow"
        :header="false"
        :footer="false"
        @cancel="discuss.isShow = false"
        :width="drawerWidth"
        closable
    >
        <div class="flex flex-col h-full">
            <!-- 反馈区顶部 -->
            <div class="header h-[30px] flex justify-between items-center my-2">
                <div>
                    <span class="text-[24px] mr-2">讨论区</span>
                    <search-bar v-model="keywords" />
                </div>
                <a-button type="primary" size="small">新增反馈</a-button>
            </div>

            <!-- 反馈列表 -->
            <div class="h-full overflow-hidden list">
                {{ discuss.targetId }} {{ discuss.targetType }}
            </div>
        </div>
    </a-drawer>
</template>

<style lang="scss" scoped></style>
