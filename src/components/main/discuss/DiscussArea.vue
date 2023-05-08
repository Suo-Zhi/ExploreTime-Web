<script setup lang="ts">
const { discuss } = store.square();
const drawerWidth = screen.availWidth / 3; // 讨论区宽度

const keywords = ref('');
const feedbackListRef = ref<any>(null);
const searchfeedbackHandle = () => {
    if (feedbackListRef.value) feedbackListRef.value.findList();
};
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
        class="discuss-area"
    >
        <div class="flex flex-col h-full overflow-hidden">
            <!-- 反馈区顶部 -->
            <div class="header h-[30px] flex justify-between items-center mt-4 mb-3 px-4">
                <div>
                    <span class="text-[24px] mr-2">讨论区</span>
                    <search-bar v-model="keywords" @search="searchfeedbackHandle" />
                </div>
                <a-button type="primary" size="small">新增反馈</a-button>
            </div>

            <!-- 反馈列表 -->
            <feedback-list
                ref="feedbackListRef"
                :keywords="keywords"
                class="flex-1 px-2 pb-[24px]"
            ></feedback-list>
        </div>
    </a-drawer>
</template>

<style lang="scss" scoped></style>
