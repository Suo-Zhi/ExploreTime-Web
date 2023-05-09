<script setup lang="ts">
import { Feedback } from '@/api/feedback/types';

interface Props {
    item: Feedback;
}
const props = withDefaults(defineProps<Props>(), {});

const { formateTime } = tool;

// 新增回复
const addReplyModalVisible = ref(false);
const newValue = ref('');
const replyListRef = ref<any>();
const addReplyHandle = async () => {
    await api.reply
        .create({
            content: newValue.value,
            feedbackId: props.item.id,
            rootId: null,
            receiverId: null,
        })
        .then(() => {
            if (replyListRef.value) replyListRef.value.getList();
            props.item.extra.replyCount++;
        });
    addReplyModalVisible.value = false;
    newValue.value = '';
};
</script>

<template>
    <section class="feedback-item border-base px-2 mb-3 pt-2 pb-1">
        <div class="header flex justify-between items-center mb-1">
            <user-item :id="props.item.authorId"></user-item>

            <!-- 额外操作 -->
            <a-popover
                position="bottom"
                :content-style="{ paddingTop: '2px', paddingBottom: '7px' }"
            >
                <icon-more
                    size="20"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="更多"
                />
                <template #content>
                    <div class="mt-[6px] cursor-pointer hover:text-primary">关注作者</div>
                    <hr class="my-1" />
                    <div class="cursor-pointer hover:text-primary">删除反馈</div>
                </template>
            </a-popover>
        </div>

        <!-- 反馈内容 -->
        <text-view :text="props.item.content" class="py-1" />

        <div class="footer flex justify-between items-center">
            <!-- 时间 -->
            <div class="text-gray-600 text-[13px]">
                {{ formateTime(props.item.createTime) }}
            </div>

            <div class="flex items-center">
                <!-- 回复按钮 -->
                <div class="flex items-center ml-2">
                    <icon-comments
                        size="18"
                        :strokeWidth="3"
                        class="action-btn hover:text-primary"
                        title="回复"
                        @click="addReplyModalVisible = true"
                    />
                    <span v-if="props.item.extra?.replyCount" class="text-[13px] ml-[2px]">
                        {{ props.item.extra.replyCount }}
                    </span>
                </div>

                <!-- 点赞按钮 -->
                <div class="flex ml-2">
                    <icon-thumbs-up
                        size="18"
                        :strokeWidth="3"
                        class="action-btn hover:text-primary"
                        :class="props.item.extra?.isLike ? '!text-primary' : ''"
                        :title="props.item.extra?.isLike ? '取消点赞' : '点赞'"
                    />
                    <span class="text-[13px] ml-[2px]">
                        {{ props.item.extra?.likeCount }}
                    </span>
                </div>
            </div>
        </div>

        <!-- 回复列表 -->
        <reply-list ref="replyListRef" :feedbackId="props.item.id"></reply-list>

        <!-- 新增回复对话框 -->
        <a-modal
            v-if="addReplyModalVisible === true"
            draggable
            v-model:visible="addReplyModalVisible"
            @ok="addReplyHandle"
            @cancel="
                addReplyModalVisible = false;
                newValue = '';
            "
        >
            <template #title>新增回复</template>
            <div>
                <cus-editor
                    toolbarType="none"
                    placeholder="输入回复"
                    v-model="newValue"
                ></cus-editor>
            </div>
        </a-modal>
    </section>
</template>

<style lang="scss" scoped></style>
