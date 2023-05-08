<script setup lang="ts">
import { Feedback } from '@/api/feedback/types';
interface Props {
    keywords: string;
}
const props = withDefaults(defineProps<Props>(), {});

const isLoad = ref(false);
const { discuss } = store.square();

// 查
const list = ref<Feedback[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.feedback
        .find({
            targetId: discuss.targetId,
            targetType: discuss.targetType,
            keywords: props.keywords,
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
defineExpose({
    findList,
});
</script>

<template>
    <load-box :isLoad="isLoad" class="h-full">
        <scroll-bar>
            <feedback-item v-for="(item, index) of list" :key="index" :item="item"></feedback-item>
        </scroll-bar>
    </load-box>
</template>

<style lang="scss" scoped></style>
