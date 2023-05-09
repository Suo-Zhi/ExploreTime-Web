<script setup lang="ts">
import { RootReply } from '@/api/reply/types';

interface Props {
    feedbackId: number;
}
const props = withDefaults(defineProps<Props>(), {});

const isLoad = ref(false);
const user = store.user();
const { formateTime } = tool;

// 获取根回复
const list = ref<RootReply[]>([]);
const getList = async () => {
    isLoad.value = true;
    await api.reply.getRoot(props.feedbackId).then((res) => {
        list.value = res.data;
    });
    isLoad.value = false;
};
watch(
    () => props.feedbackId,
    () => {
        getList();
    },
    { immediate: true }
);
defineExpose({
    getList,
});

// 回复根回复
const addReplyModalVisible = ref(false);
const activeIndex = ref(-1);
const newValue = ref('');
const childReplyListRef = ref<any>();
const addReplyHandle = async () => {
    await api.reply
        .create({
            content: newValue.value,
            feedbackId: props.feedbackId,
            rootId: list.value[activeIndex.value].id,
            receiverId: null,
        })
        .then(() => {
            if (childReplyListRef.value) childReplyListRef.value[activeIndex.value].getList();
            list.value[activeIndex.value].extra.replyCount++;
        });
    addReplyModalVisible.value = false;
    newValue.value = '';
};

// 删除回复
const delHandle = async (index: number) => {
    // 不存在回复则正常删除，反之只假删
    let method: 'delete' | 'remove' = 'delete';
    if (list.value[index].extra.replyCount) method = 'remove';

    await api.reply[method](list.value[index].id).then(() => {
        // 真删调用父组件移除该项
        if (method === 'delete') list.value.splice(index, 1);
        // 假删伪刷新
        else {
            list.value[index].content = '回复内容已删除';
            list.value[index].authorId = '';
        }
    });
};

// 切换点赞状态
const toggleLikeHandle = async (index: number) => {
    const item = list.value[index];
    const currentState = item.extra.isLike.value;

    // 点赞
    if (!currentState) {
        await api.like.create({ targetId: item.id, targetType: 'reply' }).then((res) => {
            item.extra.isLike = {
                value: true,
                id: res.data.id,
            };
            item.extra.likeCount++;
        });
    }
    // 取消点赞
    else {
        const id = item.extra.isLike.id as number;
        await api.like.del(id).then(() => {
            item.extra.isLike = {
                value: false,
                id: null,
            };
            item.extra.likeCount--;
        });
    }
};
</script>

<template>
    <!-- 根回复列表 -->
    <load-box :isLoad="isLoad" class="reply-list flex flex-col">
        <section
            class="feedback-card pt-2 pb-1 pl-8 mt-2"
            v-if="list"
            v-for="(item, index) of list"
            :key="index"
        >
            <!-- 顶部 -->
            <div class="flex justify-between items-center">
                <user-item :id="item.authorId"></user-item>

                <!-- 额外操作 -->
                <more-button-user :targetId="item.authorId" text="回复者">
                    <div
                        v-if="user.userinfo?.id === item.authorId"
                        class="border-t pt-1 mt-1 cursor-pointer hover:text-primary text-center"
                        @click="delHandle(index)"
                    >
                        删除反馈
                    </div>
                </more-button-user>
            </div>

            <!-- 回复内容 -->
            <text-view :text="item.content" class="mt-1" />

            <div class="footer flex justify-between items-center">
                <!-- 时间 -->
                <div class="text-gray-600 text-[13px]">
                    {{ formateTime(item.createTime) }}
                </div>

                <div class="flex items-center">
                    <!-- 回复按钮 -->
                    <div class="flex items-center ml-2">
                        <icon-comments
                            size="18"
                            :strokeWidth="3"
                            class="action-btn hover:text-primary"
                            title="回复"
                            @click="
                                activeIndex = index;
                                addReplyModalVisible = true;
                            "
                        />
                        <span class="text-[13px] ml-[2px]">
                            {{ item.extra?.replyCount }}
                        </span>
                    </div>

                    <!-- 点赞按钮 -->
                    <div class="flex ml-2" @click="toggleLikeHandle(index)">
                        <icon-thumbs-up
                            size="18"
                            :strokeWidth="3"
                            class="action-btn hover:text-primary"
                            :class="item.extra?.isLike.value ? '!text-primary' : ''"
                            :title="item.extra?.isLike.value ? '取消点赞' : '点赞'"
                        />
                        <span v-if="item.extra?.likeCount" class="text-[13px] ml-[2px]">
                            {{ item.extra.likeCount }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- 子回复列表 -->
            <child-reply-list
                ref="childReplyListRef"
                :feedbackId="props.feedbackId"
                :rootId="item.id"
            ></child-reply-list>
        </section>

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
    </load-box>
</template>

<style lang="scss" scoped></style>
