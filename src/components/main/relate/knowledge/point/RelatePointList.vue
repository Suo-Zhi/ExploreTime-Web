<script setup lang="ts">
import { UpdatePointDTO } from '@/api/point/dto';
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

// 新增关联
const addRelateHandle = async (index: number) => {
    await api.relate.createRelate({
        targetId: targetId.value,
        targetType: targetType.value,
        relateId: list.value[index].id,
        relateType: 'point',
    });
};

// 更新知识点
const activeIndex = ref(-1);
const refreshPointBox = inject<any>('refreshPointBox');
const refreshChunkBox = inject<any>('refreshChunkBox');
const updateHandle = async (newValue: UpdatePointDTO) => {
    const target = list.value[activeIndex.value];
    await api.point.update(target.id, newValue).then(() => {
        // 处于搜索中则刷新列表，反之简易处理
        if (keywords.value) findList();
        else {
            target.name = newValue.name;
            target.content = newValue.content;
        }
        // 刷新其它区域
        refreshPointBox();
        refreshChunkBox(); // 这里不太合理: 应该当知识块列表存在该知识点时刷新单独块,以后改
    });
    activeIndex.value = -1;
};
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
                @add="addRelateHandle($event.newIndex)"
            >
                <relate-point-item
                    :item="drag.item"
                    :isEdit="activeIndex === drag.index"
                    v-show="!drag.item.isDel"
                    @active="activeIndex = drag.index"
                    @blur="activeIndex = -1"
                    @refresh="findList"
                    @update="updateHandle"
                ></relate-point-item>
            </drag-list>
        </scroll-bar>
        <empty v-if="!isLoad && list.length === 0" text="暂无关联知识点" />
    </load-box>
</template>

<style lang="scss" scoped></style>
