<script setup lang="ts">
import { Feedback } from '@/api/feedback/types';

interface Props {
    item: Feedback;
}
const props = withDefaults(defineProps<Props>(), {});

const { formateTime } = tool;
</script>

<template>
    <section class="feedback-item border-base px-2 mb-3 pt-2 pb-1">
        <div class="header flex justify-between items-center mb-1">
            <!-- 用户信息 -->
            <section class="userinfo flex items-center">
                <avatar></avatar>
                <span class="ml-2 text-[16px] text-slate-700">Tom</span>
            </section>

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
                    />
                    <span class="text-[13px] ml-[2px]">
                        {{ props.item.extra?.replyCount }}
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
    </section>
</template>

<style lang="scss" scoped></style>
