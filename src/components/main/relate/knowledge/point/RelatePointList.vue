<script setup lang="ts">
import { Point } from '@/api/point/types';

const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const keywords = inject<any>('keywords'); // 搜索关键字

const isLoad = ref(false);

// 查
const list = ref<Point[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findPointRelate({
            targetId: targetId.value,
            targetType: targetType.value,
            relateType: 'point',
            keywords: keywords.value,
        })
        .then((res) => {
            list.value = res.data;
        })
        .finally(() => {
            isLoad.value = false;
        });
};
watch(
    targetId,
    () => {
        findList();
    },
    { immediate: true }
);

const activeIndex = ref(-1);
</script>

<template>
    <!-- 关联知识点列表 -->
    <load-box :isLoad="isLoad" class="relate-point-list h-full relative">
        <scroll-bar>
            <drag-list
                :list="list"
                item-key="id"
                :group="{ name: 'point', pull: 'clone' }"
                :sort="false"
                ghostClass=""
                v-slot="drag"
            >
                <relate-point-item
                    :item="drag.item"
                    :isEdit="activeIndex === drag.index"
                    v-show="!drag.item.isDel"
                    @refresh="findList"
                ></relate-point-item>
            </drag-list>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联知识点" />
    </load-box>
</template>

<style lang="scss" scoped></style>
