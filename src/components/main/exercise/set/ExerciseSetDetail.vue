<script setup lang="ts">
import { UpdateExerciseDTO } from '@/api/exercise/dto';
import { ExerciseSet } from '@/api/exercise/set/types';

interface Props {
    screen: 'left' | 'right'; // 当前组件所在屏幕
}
const props = withDefaults(defineProps<Props>(), {});

const { history } = store.setting();
const { openDiscussArea } = store.square(); // 打开讨论区

const exerciseSetId = computed(() => history.links[history.activeIndex[props.screen]]?.targetId); //  当前讲解Id

// 获取习题集详情
const isLoad = ref(false);
const keywords = ref('');
const exerciseSet = ref({} as ExerciseSet);
const getDetail = async () => {
    await api.exerciseSet.getDetail(exerciseSetId.value).then((res) => {
        exerciseSet.value = res.data;
    });
};
watch(
    exerciseSetId,
    () => {
        if (exerciseSetId.value) getDetail();
    },
    { immediate: true }
);

/**
 * 习题集操作
 */
// 打开关联详情
const switchHistory: any = inject('switchHistory');
const viewRelateDetail = () => {
    store.setting().addHistoryLink({
        linkType: 'relateDetail',
        linkTitle: '习题集关联-' + exerciseSet.value.name,
        targetId: exerciseSet.value.id,
        targetType: 'exerciseSet',
    });
    switchHistory('relateDetail');
};

// 公开
const refreshExerciseSetBox = inject<any>('refreshExerciseSetBox');
const togglePublicHandle = async () => {
    await api.exerciseSet
        .togglePublic(exerciseSet.value.id, !exerciseSet.value.isPublic)
        .then(() => {
            exerciseSet.value.isPublic = !exerciseSet.value.isPublic;
            store
                .global()
                .prompt(exerciseSet.value.isPublic ? '公开成功' : '已取消公开', 'success');
            refreshExerciseSetBox();
        });
};

// 编辑前处理
const editTarget = ref(''); // 编辑目标
const newValue = ref({ name: '', preface: '' }); // 新值
const editStartHandle = (target: 'name' | 'preface') => {
    // 同步值
    newValue.value.name = exerciseSet.value.name;
    newValue.value.preface = exerciseSet.value.preface;
    // 锁定编辑目标
    editTarget.value = target;
};

// 编辑完成后需进行的处理
const editEndHandle = async () => {
    // 判空
    if (tool.isEmpty(newValue.value.name, '习题集名', 'text')) return;
    // 判断值是否变动
    if (
        newValue.value.name === exerciseSet.value.name &&
        newValue.value.preface === exerciseSet.value.preface
    )
        return (editTarget.value = '');

    // 更新树信息
    await api.exerciseSet.update(exerciseSet.value.id, newValue.value).then(() => {
        // 刷新
        exerciseSet.value.name = newValue.value.name;
        exerciseSet.value.preface = newValue.value.preface;
        history.links[history.activeIndex[props.screen]].linkTitle =
            '习题集详情-' + newValue.value.name;
        refreshExerciseSetBox();
    });
    editTarget.value = ''; // 取消编辑状态
};

/**
 * 习题操作
 */
// 更新
const activeIndex = ref(-1);
const refreshExerciseBox = inject<any>('refreshExerciseBox');
const updateContentHandle = async (newValue: UpdateExerciseDTO) => {
    const target = exerciseSet.value.content[activeIndex.value];
    await api.exercise.update(target.id, newValue).then(() => {
        // 处于搜索中则刷新列表，反之简易处理
        if (keywords.value) getDetail();
        else {
            target.question = newValue.question;
            target.detail = newValue.detail;
            target.answer = newValue.answer;
            target.analysis = newValue.analysis;
        }
        refreshExerciseBox();
    });
    activeIndex.value = -1;
};

// 改变习题顺序
const changeOrderHandle = async () => {
    // 改变块顺序(以后看看能不能一次性改)
    for (let i = 0; i < exerciseSet.value.content.length; i++) {
        const exercise = exerciseSet.value.content[i];
        await api.exerciseSetContent
            .upsert({ setId: exerciseSet.value.id, order: i, exerciseId: exercise.id })
            .then(() => {
                // 伪刷新点排序,否则连续新增会乱序
                exerciseSet.value.content[i].order = i;
            });
    }

    // 改变习题集更新时间
    await api.exerciseSet.updateTime(exerciseSet.value.id);
};

// 移出习题
const removeContentHandle = async (index?: number) => {
    // 按钮移出需要伪刷新,拖拽移出不用
    if (typeof index === 'number') exerciseSet.value.content.splice(index, 1);
    // 先删除列表[最后一项],然后再通过upset获得新列表(删的不是最后一个会导致出现两个末尾项)
    const length = exerciseSet.value.content.length;
    await api.exerciseSetContent
        .delete({ setId: exerciseSet.value.id, order: length })
        .then(async () => {
            await changeOrderHandle();
        });
};

// 新增习题
const addContentHandle = (index: number) => {
    // 往列表指定位置插入空白项
    exerciseSet.value.content.splice(index, 0, {
        id: -1,
        order: index,
        question: '',
        detail: '',
        answer: '',
        analysis: '',
        isRefine: false,
        isDel: false,
        isMatch: false,
        authorId: store.user().userinfo?.id || '',
        createTime: new Date(),
        updateTime: new Date(),
    });
    // 激活新空白项
    activeIndex.value = index;
};
</script>

<template>
    <common-box v-if="exerciseSet.id" class="exerciseSet-detail pb-[6px]" :isLoad="isLoad">
        <!-- 习题集标题 -->
        <div class="exerciseSet-title text-center mt-[6px] mb-[8px]">
            <edit-item
                type="text"
                :value="exerciseSet.name"
                :isEdit="editTarget === 'name'"
                placeholder="请输入习题集名"
                @editStart="editStartHandle('name')"
                @changeValue="newValue.name = $event"
                @editEnd="editEndHandle"
                class="text-[26px]"
                textClass="text-[26px] leading-[26px] h-[31.5px] text-center"
            ></edit-item>
        </div>

        <!-- 习题集前言 -->
        <div class="preface !ml-[2px] mb-[5px]">
            <edit-item
                :value="exerciseSet.preface"
                :isEdit="editTarget === 'preface'"
                placeholder="请输入习题集前言"
                @editStart="editStartHandle('preface')"
                @changeValue="newValue.preface = $event"
                @editEnd="editEndHandle"
            ></edit-item>
        </div>

        <!-- 习题列表 -->
        <drag-list
            :list="exerciseSet.content"
            item-key="id"
            group="exercise"
            v-slot="drag"
            @update="changeOrderHandle"
            @add="changeOrderHandle"
            @remove="removeContentHandle()"
        >
            <exercise-set-content
                :item="drag.item"
                :isEdit="activeIndex === drag.index"
                @active="activeIndex = drag.index"
                @blur="activeIndex = -1"
                @update="updateContentHandle"
                @remove="removeContentHandle(drag.index)"
                @add="addContentHandle"
                @create="changeOrderHandle"
                v-show="!drag.item.isDel"
            ></exercise-set-content>
        </drag-list>

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
                    title="查看关联情况"
                    @click="viewRelateDetail"
                />
                <icon-comment
                    size="18"
                    :strokeWidth="3"
                    class="action-btn hover:text-primary mt-[1px]"
                    title="查看反馈"
                    @click="openDiscussArea(exerciseSet.id, 'exerciseSet')"
                />
                <lock-button
                    :isPublic="exerciseSet.isPublic"
                    @click="togglePublicHandle"
                ></lock-button>
            </div>
        </template>
    </common-box>
</template>

<style lang="scss" scoped></style>
