<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { Chunk } from '@/api/chunk/types';
import { UpdatePointDTO } from '@/api/point/dto';

interface Props {
    item: Chunk;
    isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

/* 块操作 */
// 移除
const removeHandle = async () => {
    await api.chunk.remove(props.item.id).then(() => {
        props.item.isDel = true;
    });
};

// 归档
const toggleRefineHandle = async () => {
    await api.chunk.toggleRefine(props.item.id, !props.item.isRefine).then(() => {
        props.item.isRefine = !props.item.isRefine;
    });
};

const emit = defineEmits(['active', 'blur', 'update', 'refresh']);

// 编辑前处理
const newValue = ref({ name: '', preface: '', endnote: '' }); // 新值
const editTarget = ref('name'); // 编辑目标
const editStartHandle = (target: 'name' | 'preface' | 'endnote') => {
    // 该项切换至激活状态
    emit('active');
    // 同步值
    newValue.value.name = props.item.name;
    newValue.value.preface = props.item.preface;
    newValue.value.endnote = props.item.endnote;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识块名', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.name === props.item.name &&
        newValue.value.preface === props.item.preface &&
        newValue.value.endnote === props.item.endnote
    )
        return emit('blur');

    // 调用新增或更新事件
    if (props.item.id === -1) create();
    else emit('update', newValue.value);
};

// 新增知识块
const create = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '知识块名', 'text')) return;

    await api.chunk.create(newValue.value).then(() => {
        emit('refresh');
    });
    emit('blur');
};

/* 块内容操作 */
// 更新块内容
const activeIndex = ref(-1); // 激活块内容索引
const refreshPointBox = inject<any>('refreshPointBox');
const updateContentHandle = async (newValue: UpdatePointDTO) => {
    const target = props.item.content[activeIndex.value];
    await api.point.update(target.id, newValue).then(() => {
        // 简易刷新
        target.name = newValue.name;
        target.content = newValue.content;
        refreshPointBox(); // 刷新知识点列表
    });
    activeIndex.value = -1;
};

// 改变块内容顺序
const changeOrderHandle = async () => {
    // 改变块顺序(以后看看能不能一次性改)
    for (let i = 0; i < props.item.content.length; i++) {
        const point = props.item.content[i];
        await api.chunkContent
            .upsert({ chunkId: props.item.id, order: i, pointId: point.id })
            .then(async () => {
                // 伪刷新点排序,否则连续新增会乱序
                props.item.content[i].order = i;
                // 移入的知识点需归档
                if (!point.isRefine) {
                    await api.point.toggleRefine(point.id, !point.isRefine);
                    refreshPointBox();
                }
            });
    }
    // 改变知识块更新时间
    await api.chunk.updateTime(props.item.id);
};

// 移出块内容
const removeContentHandle = async (index?: number) => {
    // 按钮移出需要伪刷新,拖拽移出不用
    if (typeof index === 'number') props.item.content.splice(index, 1);
    // 先删除列表[最后一项],然后再通过upset获得新列表(删的不是最后一个会导致出现两个末尾项)
    const length = props.item.content.length;
    await api.chunkContent.delete({ chunkId: props.item.id, order: length }).then(async () => {
        await changeOrderHandle();
    });
};

// 新增块内容
const addContentHandle = (index: number) => {
    // 往列表指定位置插入空白项
    props.item.content.splice(index, 0, {
        id: -1,
        order: index,
        name: '',
        content: '',
        isRefine: true,
        isDel: false,
        isMatch: false,
        authorId: store.user().userinfo?.id || '',
        createTime: new Date(),
        updateTime: new Date(),
    });
    // 激活新空白项
    activeIndex.value = index;
};

// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '块关联-' + props.item.name,
        targetId: props.item.id,
        targetType: 'chunk',
    });
    switchHistory('relateDetail');
};

const { openDiscussArea } = store.square(); // 打开讨论区
</script>

<template>
    <!-- 知识块 -->
    <card-fold class="mb-3" :isToggle="false">
        <!-- 标题 -->
        <template #title>
            <!-- 知识块名 -->
            <edit-item
                type="text"
                :value="props.item.name"
                :isEdit="props.isEdit && editTarget === 'name'"
                @editStart="editStartHandle('name')"
                @changeValue="newValue.name = $event"
                @editEnd="editEndHandle"
                placeholder="请输入知识块名"
                class="title py-2 w-[200px]"
            ></edit-item>
            <!-- 拖拽手柄 -->
            <div class="drag-handle">&nbsp;</div>
        </template>

        <!-- 顶部操作栏 -->
        <template #actions>
            <div class="action-bar mr-2">
                <icon-link-one
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(item.id, 'chunk')"
                />
                <icon-hammer-and-anvil
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary"
                    title="转化为知识树"
                />
            </div>
        </template>

        <!-- 知识块主体 -->
        <div class="chunk-main mt-2 mb-1 content-text mx-[10px]">
            <!-- 知识块前言 -->
            <div class="preface" v-if="props.item.preface">
                <edit-item
                    :value="props.item.preface"
                    :isEdit="props.isEdit && editTarget === 'preface'"
                    @editStart="editStartHandle('preface')"
                    @changeValue="newValue.preface = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识块前言"
                ></edit-item>
            </div>

            <!-- 知识块内容列表 -->
            <div class="content my-1">
                <drag-list
                    :list="props.item.content"
                    item-key="order"
                    group="point"
                    @update="changeOrderHandle"
                    @add="changeOrderHandle"
                    @remove="removeContentHandle()"
                    v-slot="drag"
                >
                    <chunk-content
                        v-show="!drag.item.isDel"
                        :item="drag.item"
                        :isEdit="activeIndex === drag.index"
                        @active="activeIndex = drag.index"
                        @blur="activeIndex = -1"
                        @update="updateContentHandle"
                        @remove="removeContentHandle(drag.index)"
                        @add="addContentHandle"
                        @create="changeOrderHandle"
                    ></chunk-content>
                </drag-list>
                <add-line-one
                    text="新增块内容"
                    @add="addContentHandle(props.item.content.length)"
                ></add-line-one>
            </div>

            <!-- 知识块尾注 -->
            <div class="endnote !mt-[6px]" v-if="props.item.preface">
                <edit-item
                    :value="props.item.endnote"
                    :isEdit="props.isEdit && editTarget === 'endnote'"
                    @editStart="editStartHandle('endnote')"
                    @changeValue="newValue.endnote = $event"
                    @editEnd="editEndHandle"
                    placeholder="请输入知识块尾注"
                ></edit-item>
            </div>
        </div>

        <!-- 知识块项底部 -->
        <div class="chunk-footer flex justify-between items-center ml-3 mb-2">
            <time-bar
                :createTime="props.item.createTime"
                :updateTime="props.item.updateTime"
            ></time-bar>

            <!-- 底部操作栏 -->
            <section class="action-bar mr-2">
                <component
                    :is="props.item.isRefine ? icons['InboxOut'] : icons['InboxIn']"
                    size="17"
                    :strokeWidth="3"
                    :title="props.item.isRefine ? '还需处理' : '处理完成'"
                    class="action-btn hover:text-primary"
                    @click="toggleRefineHandle"
                ></component>
                <icon-delete
                    size="17"
                    :strokeWidth="3"
                    class="action-btn hover:text-red-600"
                    title="删除"
                    @click="removeHandle"
                />
            </section>
        </div>
    </card-fold>
</template>

<style lang="scss" scoped></style>
