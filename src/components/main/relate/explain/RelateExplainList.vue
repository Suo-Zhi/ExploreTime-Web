<script setup lang="ts">
import { Explain } from '@/api/explain/types';

const targetId = inject<any>('targetId'); // 源目标Id
const targetType = inject<any>('targetType'); // 源目标类型
const keywords = inject<any>('keywords'); // 搜索关键字

const isLoad = ref(false);

// 查
const list = ref<Explain[]>([]);
const findList = async () => {
    isLoad.value = true;

    await api.relate
        .findExplainRelate({
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
            relateType: 'explain',
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
    <!-- 关联讲解列表 -->
    <load-box :isLoad="isLoad" class="relate-explain-list h-full pb-[36px] relative">
        <scroll-bar>
            <drag-list
                :list="list"
                item-key="id"
                :group="{ name: 'explain', pull: 'clone' }"
                :sort="false"
                ghostClass=""
                v-slot="drag"
                @add="addRelateHandle($event.newIndex)"
            >
                <relate-explain-item
                    :item="drag.item"
                    :isEdit="activeIndex === drag.index"
                    @refresh="findList"
                    v-show="!drag.item.isDel"
                ></relate-explain-item>
            </drag-list>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联讲解" />
    </load-box>
</template>

<style lang="scss" scoped></style>
