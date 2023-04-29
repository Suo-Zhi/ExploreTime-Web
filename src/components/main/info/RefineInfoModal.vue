<script setup lang="ts">
interface Props {
    isShow: boolean;
    id: number; // 有效信息Id
    content: string; // 知识点默认内容
}
const props = withDefaults(defineProps<Props>(), {});

const name = ref('');

// 提炼有效信息为知识点
const emit = defineEmits(['update:isShow', 'update:content', 'refresh']);
const refreshPointBox: any = inject('refreshPointBox');
const refineToPointHandle = async () => {
    // 判空
    if (tool.isEmpty(name.value, 'text'))
        return store.global().prompt('知识点名不能为空', 'warning');
    // 新增知识点
    await api.point.create({ name: name.value, content: props.content }).then(async () => {
        refreshPointBox(); // 刷新知识点列表
        // 信息归档
        await api.info.toggleRefine(props.id, true).then(() => {
            emit('refresh'); // 刷新有效信息列表
            closeHandle();
        });
    });
};

// 关闭模态框
const closeHandle = () => {
    emit('update:isShow', false);
    name.value = '';
    return true;
};
</script>

<template>
    <a-modal
        :visible="props.isShow"
        title="将有效信息提炼为知识点"
        okText="提炼"
        width="760px"
        :on-before-ok="refineToPointHandle"
        :on-before-cancel="closeHandle"
    >
        <div class="input-point-name flex items-center mb-4">
            <span class="w-[100px]">知识点名：</span>
            <a-input v-model="name" placeholder="输入知识点名..."></a-input>
        </div>

        <cus-editor
            mode="simple"
            class="w-full"
            placeholder="输入知识点内容..."
            :model-value="props.content"
            @change="$emit('update:content', $event)"
        ></cus-editor>
    </a-modal>
</template>

<style lang="scss" scoped></style>
