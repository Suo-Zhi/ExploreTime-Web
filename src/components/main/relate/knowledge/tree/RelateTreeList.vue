<script setup lang="ts">
import { Tree } from '@/api/tree/types';

const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const keywords = inject<any>('keywords'); // 搜索关键字

const isLoad = ref(false);

// 查
const list = ref<Tree[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findTreeRelate({
            targetId: targetId.value,
            targetType: targetType.value,
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

// 新增关联
const addRelateHandle = async (index: number) => {
    await api.relate
        .createRelate({
            targetId: targetId.value,
            targetType: targetType.value,
            relateId: list.value[index].id,
            relateType: 'tree',
        })
        .then((res) => {
            // 不能重复关联或关联本身
            if (res.data.status === 0) {
                list.value.splice(index, 1);
                store.global().prompt(res.data.msg);
            }
        });
};
</script>

<template>
    <!-- 关联知识点列表 -->
    <load-box :isLoad="isLoad" class="relate-point-list h-full pb-[36px] relative">
        <scroll-bar>
            <drag-list
                :list="list"
                item-key="id"
                :group="{ name: 'tree', pull: 'clone' }"
                :sort="false"
                ghostClass=""
                v-slot="drag"
                @add="addRelateHandle($event.newIndex)"
            >
                <relate-tree-item
                    :item="drag.item"
                    :isEdit="activeIndex === drag.index"
                    @refresh="findList"
                    v-show="!drag.item.isDel"
                ></relate-tree-item>
            </drag-list>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联知识树" />
    </load-box>
</template>

<style lang="scss" scoped></style>
