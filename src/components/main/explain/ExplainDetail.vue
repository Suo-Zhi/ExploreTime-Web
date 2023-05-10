<script setup lang="ts">
import { Explain } from '@/api/explain/types';

interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});

const { history } = store.setting();
const { openDiscussArea } = store.square(); // 打开讨论区

const explainId = computed(() => history.links[history.activeIndex[props.screen]].targetId); //  当前树Id

// 获取树详情
const isLoad = ref(false);
const keywords = ref('');
const explainDetail = ref({} as Explain);
const getDetail = async () => {
    await api.explain.getDetail(explainId.value).then((res) => {
        explainDetail.value = res.data;
    });
};
watch(
    explainId,
    () => {
        getDetail();
    },
    { immediate: true }
);

provide('refreshExplainDetail', getDetail);

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '讲解关联-' + explainDetail.value.title,
        targetId: explainDetail.value.id,
        targetType: 'explain',
    });
    switchHistory('relateDetail');
};

// 公开
const refreshExplainBox = inject<any>('refreshExplainBox');
const togglePublicHandle = async () => {
    await api.explain
        .togglePublic(explainDetail.value.id, !explainDetail.value.isPublic)
        .then(() => {
            explainDetail.value.isPublic = !explainDetail.value.isPublic;
            refreshExplainBox();
            store
                .global()
                .prompt(explainDetail.value.isPublic ? '公开成功' : '已取消公开', 'success');
        });
};

// 编辑前处理
const editTarget = ref(''); // 编辑目标
const newValue = ref({ title: '', content: '' }); // 新值
const editStartHandle = (target: 'title' | 'content') => {
    // 同步值
    newValue.value.title = explainDetail.value.title;
    newValue.value.content = explainDetail.value.content;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.title, '讲解名', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.title === explainDetail.value.title &&
        newValue.value.content === explainDetail.value.content
    )
        return (editTarget.value = '');

    // 更新树信息
    await api.explain.update(explainDetail.value.id, newValue.value).then(() => {
        // 刷新
        explainDetail.value.title = newValue.value.title;
        explainDetail.value.content = newValue.value.content;
        history.links[history.activeIndex[props.screen]].linkTitle =
            '讲解详情-' + newValue.value.title;
        refreshExplainBox();
    });
    editTarget.value = ''; // 取消编辑状态
};
</script>

<template>
    <common-box v-if="explainDetail.id" class="explain-detail pb-[6px]" :isLoad="isLoad">
        <!-- 讲解标题 -->
        <div class="explain-title text-center mt-[6px] mb-[8px]">
            <edit-item
                type="text"
                :value="explainDetail.title"
                :isEdit="editTarget === 'title'"
                placeholder="请输入讲解标题"
                @editStart="editStartHandle('title')"
                @changeValue="newValue.title = $event"
                @editEnd="editEndHandle"
                class="text-[26px]"
                textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
            ></edit-item>
        </div>

        <!-- 讲解内容 -->
        <div class="content !ml-[2px] mb-[5px]">
            <edit-item
                :value="explainDetail.content"
                :isEdit="editTarget === 'content'"
                placeholder="请输入讲解内容"
                @editStart="editStartHandle('content')"
                @changeValue="newValue.content = $event"
                @editEnd="editEndHandle"
            ></edit-item>
        </div>

        <template #navLeft>
            <search-bar v-model="keywords"></search-bar>
        </template>

        <template #navRight>
            <div class="action-bar">
                <icon-redo
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="刷新"
                    @click="getDetail"
                />
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联项"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(explainDetail.id, 'explain')"
                />
                <lock-button
                    :isPublic="explainDetail.isPublic"
                    @click="togglePublicHandle"
                ></lock-button>
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
