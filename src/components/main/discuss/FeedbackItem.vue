<script setup lang="ts">
import { Feedback } from '@/api/feedback/types';

interface Props {
    item: Feedback;
}
const props = withDefaults(defineProps<Props>(), {});

const { formateTime } = tool;
const user = store.user();

// 回复反馈
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

// 删除反馈
const emit = defineEmits(['delete']);
const delHandle = async () => {
    // 不存在回复则正常删除，反之只假删
    let method: 'delete' | 'remove' = 'delete';
    if (props.item.extra.replyCount) method = 'remove';

    await api.feedback[method](props.item.id).then(() => {
        // 真删调用父组件移除该项
        if (method === 'delete') emit('delete');
        // 假删伪刷新
        else {
            props.item.content = '反馈内容已删除';
            props.item.authorId = '';
        }
    });
};

// 切换点赞状态
const toggleLikeHandle = async () => {
    const currentState = props.item.extra.isLike.value;

    // 点赞
    if (!currentState) {
        await api.like.create({ targetId: props.item.id, targetType: 'feedback' }).then((res) => {
            props.item.extra.isLike = {
                value: true,
                id: res.data.id,
            };
            props.item.extra.likeCount++;
        });
    }
    // 取消点赞
    else {
        const id = props.item.extra.isLike.id as number;
        await api.like.del(id).then(() => {
            props.item.extra.isLike = {
                value: false,
                id: null,
            };
            props.item.extra.likeCount--;
        });
    }
};
</script>

<template>
    <section class="feedback-item border-base px-2 mb-3 pt-2 pb-1">
        <div class="header flex justify-between items-center mb-1">
            <user-item :id="props.item.authorId"></user-item>

            <!-- 额外操作 -->
            <a-popover
                v-if="item.authorId"
                position="left"
                :content-style="{ paddingTop: '2px', paddingBottom: '7px' }"
            >
                <icon-more
                    size="20"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="更多"
                />
                <template #content>
                    <div class="mt-[6px] cursor-pointer text-center hover:text-primary">
                        关注反馈者
                    </div>
                    <div
                        v-if="user.userinfo?.id === item.authorId"
                        class="border-t pt-1 mt-1 cursor-pointer hover:text-primary text-center"
                        @click="delHandle"
                    >
                        删除反馈
                    </div>
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
                <div class="flex ml-2" @click="toggleLikeHandle">
                    <icon-thumbs-up
                        size="18"
                        :strokeWidth="3"
                        class="action-btn hover:text-primary"
                        :class="props.item.extra?.isLike.value ? '!text-primary' : ''"
                        :title="props.item.extra?.isLike.value ? '取消点赞' : '点赞'"
                    />
                    <span v-if="props.item.extra?.likeCount" class="text-[13px] ml-[2px]">
                        {{ props.item.extra.likeCount }}
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
