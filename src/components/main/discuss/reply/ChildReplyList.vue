<script setup lang="ts">
import { ChildReply } from '@/api/reply/types';

interface Props {
    feedbackId: number;
    rootId: number;
}
const props = withDefaults(defineProps<Props>(), {});

const isLoad = ref(false);
const user = store.user();
const { formateTime } = tool;

// 获取根回复
const list = ref<ChildReply[]>([]);
const getList = async () => {
    isLoad.value = true;
    await api.reply.getChild(props.rootId).then((res) => {
        list.value = res.data;
    });
    isLoad.value = false;
};
watch(
    () => props.rootId,
    () => {
        getList();
    },
    { immediate: true }
);
defineExpose({
    getList,
});

// 回复子回复
const addReplyModalVisible = ref(false);
const activeIndex = ref(-1);
const newValue = ref('');
const addReplyHandle = async () => {
    await api.reply
        .create({
            content: newValue.value,
            feedbackId: props.feedbackId,
            rootId: props.rootId,
            receiverId: list.value[activeIndex.value].author.id,
        })
        .then(() => {
            getList();
        });
    addReplyModalVisible.value = false;
    newValue.value = '';
};

// 删除回复
const delHandle = async (index: number) => {
    await api.reply.delete(list.value[index].id).then(() => {
        list.value.splice(index, 1);
    });
};
</script>

<template>
    <load-box :isLoad="isLoad" class="child-reply-list">
        <!-- 子回复列表 -->
        <section
            class="feedback-card pt-2 pb-1 pl-8 mt-2"
            v-if="list"
            v-for="(item, index) of list"
            :key="index"
        >
            <!-- 顶部 -->
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <user-item :id="item.author.id"></user-item>
                    <!-- 回复者 -->
                    <span
                        v-if="item.receiver?.nickname"
                        class="ml-2 text-[16px] text-primary cursor-pointer"
                    >
                        @ {{ item.receiver.nickname }}
                    </span>
                </div>

                <!-- 额外操作 -->
                <a-popover
                    v-if="item.author.id"
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
                            关注回复者
                        </div>
                        <div
                            v-if="user.userinfo?.id === item.author.id"
                            class="border-t pt-1 mt-1 cursor-pointer hover:text-primary text-center"
                            @click="delHandle(index)"
                        >
                            删除回复
                        </div>
                    </template>
                </a-popover>
            </div>

            <!-- 内容 -->
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
                    </div>

                    <!-- 点赞按钮 -->
                    <div class="flex ml-2">
                        <icon-thumbs-up
                            size="18"
                            :strokeWidth="3"
                            class="action-btn hover:text-primary"
                            :class="item.extra?.isLike ? '!text-primary' : ''"
                            :title="item.extra?.isLike ? '取消点赞' : '点赞'"
                        />
                        <span class="text-[13px] ml-[2px]">
                            {{ item.extra?.likeCount }}
                        </span>
                    </div>
                </div>
            </div>
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
            <template #title>
                回复&nbsp;
                <span class="text-primary">@{{ list[activeIndex].author.nickname }}</span>
            </template>
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
