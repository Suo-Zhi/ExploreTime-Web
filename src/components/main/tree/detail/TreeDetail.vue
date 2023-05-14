<script setup lang="ts">
import { TreeDetail } from '@/api/tree/treeNode/types';

interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});
const { history } = store.setting();
const { openDiscussArea } = store.square(); // 打开讨论区

const treeId = computed(() => history.links[history.activeIndex[props.screen]]?.targetId); //  当前树Id

// 获取树详情
const isLoad = ref(false);
const keywords = ref('');
const treeDetail = ref({} as TreeDetail);
const getTreeDetail = async () => {
    await api.treeNode.getTreeDetail(treeId.value).then((res) => {
        treeDetail.value = res.data;
    });
};
watch(
    treeId,
    () => {
        if (treeId.value) getTreeDetail();
    },
    { immediate: true }
);

provide('refreshTreeDetail', getTreeDetail);

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '树关联-' + treeDetail.value.name,
        targetId: treeDetail.value.id,
        targetType: 'tree',
    });
    switchHistory('relateDetail');
};

// 公开
const refreshTreeBox = inject<any>('refreshTreeBox');
const togglePublicHandle = async () => {
    await api.tree.togglePublic(treeDetail.value.id, !treeDetail.value.isPublic).then(() => {
        treeDetail.value.isPublic = !treeDetail.value.isPublic;
        refreshTreeBox();
        store.global().prompt(treeDetail.value.isPublic ? '公开成功' : '已取消公开', 'success');
    });
};

// 编辑前处理
const editTarget = ref(''); // 编辑目标
const newValue = ref({ name: '', preface: '' }); // 新值
const editStartHandle = (target: 'name' | 'preface') => {
    // 同步值
    newValue.value.name = treeDetail.value.name;
    newValue.value.preface = treeDetail.value.preface;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识树名', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.name === treeDetail.value.name &&
        newValue.value.preface === treeDetail.value.preface
    )
        return (editTarget.value = '');

    // 更新树信息
    await api.tree.update(treeDetail.value.id, newValue.value).then(() => {
        // 刷新
        treeDetail.value.name = newValue.value.name;
        treeDetail.value.preface = newValue.value.preface;
        history.links[history.activeIndex[props.screen]].linkTitle =
            '树详情-' + newValue.value.name;
        refreshTreeBox();
    });
    editTarget.value = ''; // 取消编辑状态
};

// 刷新知识树(怪,怎么isDrag突然会自己变了,先手动刷新以后改)
nextTick(() => {
    document.addEventListener('keyup', (e) => {
        if (e.key === 'f' && treeId.value) getTreeDetail();
    });
});
</script>

<template>
    <common-box v-if="treeDetail.id" class="tree-detail pb-[6px]" :isLoad="isLoad">
        <!-- 知识树名 -->
        <div class="tree-name text-center mt-[6px] mb-[8px]">
            <edit-item
                type="text"
                :value="treeDetail.name"
                :isEdit="editTarget === 'name'"
                placeholder="请输入知识树名"
                @editStart="editStartHandle('name')"
                @changeValue="newValue.name = $event"
                @editEnd="editEndHandle"
                class="text-[26px]"
                textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
            ></edit-item>
        </div>

        <!-- 知识树前言 -->
        <div class="preface !ml-[2px] mb-[5px]">
            <edit-item
                :value="treeDetail.preface"
                :isEdit="editTarget === 'preface'"
                placeholder="请输入知识树前言"
                @editStart="editStartHandle('preface')"
                @changeValue="newValue.preface = $event"
                @editEnd="editEndHandle"
            ></edit-item>
        </div>

        <!-- 知识树节点 -->
        <tree-node-list
            :treeId="treeDetail.id"
            :parentNodeId="null"
            :deep="0"
            :parentPrefix="''"
            :nodes="treeDetail.nodes"
        ></tree-node-list>

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
                    @click="getTreeDetail"
                />
                <icon-link-one
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(treeDetail.id, 'tree')"
                />
                <lock-button
                    :isPublic="treeDetail.isPublic"
                    @click="togglePublicHandle"
                ></lock-button>
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
