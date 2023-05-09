<script setup lang="ts">
import { Feedback } from '@/api/feedback/types';

const isLoad = ref(false);
const { discuss } = store.square();
const drawerWidth = screen.availWidth / 3; // 讨论区宽度

// 查
const list = ref<Feedback[]>([]);
const keywords = ref('');
const findList = async () => {
    isLoad.value = true;

    await api.feedback
        .find({
            targetId: discuss.targetId,
            targetType: discuss.targetType,
            keywords: keywords.value,
        })
        .then((res) => {
            list.value = res.data;
        });
    isLoad.value = false;
};
watch(
    () => discuss.isShow,
    (isShow) => {
        if (isShow) findList();
    }
);

// 新增反馈
const addFeedbackModalVisible = ref(false);
const newValue = ref('');
const addFeedback = async () => {
    await api.feedback.create({
        content: newValue.value,
        targetId: discuss.targetId,
        targetType: discuss.targetType,
    });
    findList();
    addFeedbackModalVisible.value = false;
    newValue.value = '';
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
                    <search-bar v-model="keywords" @search="findList" />
                </div>
                <a-button type="primary" size="small" @click="addFeedbackModalVisible = true">
                    新增反馈
                </a-button>
            </div>

            <!-- 反馈列表 -->
            <load-box :isLoad="isLoad" class="h-full px-2 pb-[24px]">
                <scroll-bar>
                    <feedback-item
                        v-for="(item, index) of list"
                        :key="index"
                        :item="item"
                    ></feedback-item>
                </scroll-bar>
            </load-box>
            <empty v-if="!isLoad && list.length === 0" text="暂无反馈" />
        </div>

        <!-- 新增反馈对话框 -->
        <a-modal
            draggable
            v-model:visible="addFeedbackModalVisible"
            @ok="addFeedback"
            @cancel="
                addFeedbackModalVisible = false;
                newValue = '';
            "
        >
            <template #title>新增反馈</template>
            <div>
                <cus-editor
                    toolbarType="none"
                    placeholder="输入反馈"
                    v-model="newValue"
                ></cus-editor>
            </div>
        </a-modal>
    </a-drawer>
</template>

<style lang="scss" scoped></style>
