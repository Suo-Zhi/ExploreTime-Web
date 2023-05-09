<script setup lang="ts">
import { ChildReply } from '@/api/reply/types';

interface Props {
    rootId: number;
}
const props = withDefaults(defineProps<Props>(), {});

const { formateTime } = tool;
const isLoad = ref(false);

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
</script>

<template>
    <load-box :isLoad="isLoad" class="child-reply-list">
        <!-- 子回复列表 -->
        <div
            class="feedback-card pt-2 pb-1 pl-8 mt-2"
            v-if="list"
            v-for="(item, index) of list"
            :key="index"
        >
            <!-- 顶部 -->
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <user-item :id="item.authorId"></user-item>
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
                        <div class="mt-[6px] cursor-pointer hover:text-primary">关注回复者</div>
                        <hr class="my-1" />
                        <div class="cursor-pointer hover:text-primary">删除反馈</div>
                    </template>
                </a-popover>
            </div>
            <!-- 内容 -->
            <div class="mt-1" v-html="item.content"></div>

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
                        />
                        <span class="text-[13px] ml-[2px]">
                            {{ item.extra?.replyCount }}
                        </span>
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
        </div>
    </load-box>
</template>

<style lang="scss" scoped></style>
