<script setup lang="ts">
interface Props {
    value: string; // 显示值
    isEdit: boolean; // 是否切换为编辑状态
    placeholder: string;
    type?: 'rich' | 'text'; // 编辑框类型（富文本 | 普通文本）
    textClass?: string; // 普通文本样式
}
const props = withDefaults(defineProps<Props>(), {
    isEdit: false,
    type: 'rich',
    textClass: '',
});

const newValue = ref('');

// 初始化input值
const emit = defineEmits(['changeValue', 'editStart', 'editEnd']);
watch(
    () => props.isEdit,
    () => {
        if (props.isEdit) {
            newValue.value = props.value;
            emit('changeValue', newValue.value);
        }
    }
);
</script>

<template>
    <section class="edit-item w-full">
        <!-- 编辑模式 -->
        <div v-if="props.isEdit" class="relative z-50">
            <!-- 富文本编辑框 -->
            <cus-editor
                v-if="props.type === 'rich'"
                :placeholder="props.placeholder"
                :model-value="props.value"
                @change="
                    newValue = $event;
                    $emit('changeValue', newValue);
                "
                @keydown.ctrl.enter="$emit('editEnd', newValue)"
            ></cus-editor>
            <!-- 普通文本编辑框: 注意:value那里 -->
            <input
                v-else
                autofocus
                type="text"
                :value="newValue"
                :placeholder="props.placeholder"
                @input="
                    newValue = ($event.target as HTMLInputElement).value;
                    $emit('changeValue', newValue);
                "
                @keydown.ctrl.enter="$emit('editEnd', newValue)"
                class="w-full h-[24px] bg-white border-b border-primary ring-0 outline-none text-[14px]"
                :class="props.textClass"
            />
        </div>

        <!-- 浏览模式 -->
        <text-view
            v-else
            :text="props.value"
            :textClass="props.textClass"
            @dblclick.stop="$emit('editStart')"
        ></text-view>

        <!-- 编辑蒙版 -->
        <div
            class="fixed min-h-screen w-screen bg-transparent z-40 top-0 left-0"
            :class="isEdit ? 'block' : 'hidden'"
            @dblclick.stop="$emit('editEnd', newValue)"
        ></div>
    </section>
</template>

<style lang="scss" scoped></style>
