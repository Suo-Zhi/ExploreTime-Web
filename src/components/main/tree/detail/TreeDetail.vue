<script setup lang="ts">
import { TreeDetail } from '@/api/tree/treeNode/types';

interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});
const { history } = store.setting();

const treeId = computed(() => history.links[history.activeIndex[props.screen]].targetId); //  当前树Id

// 获取树详情
const treeDetail = ref<TreeDetail>();
const getTreeDetail = async () => {
    await api.treeNode.getTreeDetail(treeId.value).then((res) => {
        treeDetail.value = res.data;
        console.log(treeDetail.value);
    });
};
getTreeDetail();
</script>

<template>
    <section class="tree-detail">{{ treeDetail }}</section>
</template>

<style lang="scss" scoped></style>
