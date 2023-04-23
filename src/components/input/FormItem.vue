<script setup lang="ts">
interface Props {
    label: string; // 表单项名
    modelValue: string; // 绑定值
    placeholder: string; // 占位符

    type?: 'text' | 'password'; // 表单项类型

    order?: number; // 该项在表单中的顺序
    enterCallback?: Function; // 回车回调
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    isTop: true,
});

// 回车跳转输入框
const toggleInput = (e: any) => {
    e.target.blur();

    // 不跳转
    if (typeof props.order !== 'number') return;
    // 非尾项则跳转至下一项
    const inputs: any = document.querySelectorAll('.arco-input');
    if (props.order - 1 !== inputs.length - 1) inputs[props.order].focus();
    // 尾项则触发预设回调
    else if (props.enterCallback) props.enterCallback();
};
</script>

<template>
    <a-form-item class="form-item relative -mt-2" :label="props.label">
        <div class="w-full -mt-2">
            <!-- 文本输入 -->
            <a-input
                v-if="props.type === 'text'"
                :model-value="props.modelValue"
                :placeholder="props.placeholder"
                @press-enter="toggleInput($event)"
                @input="$emit('update:modelValue', $event)"
            />
            <!-- 密码输入 -->
            <a-input-password
                v-else-if="props.type === 'password'"
                :model-value="props.modelValue"
                :placeholder="props.placeholder"
                @press-enter="toggleInput($event)"
                @input="$emit('update:modelValue', $event)"
            />
        </div>
        <div class="tip absolute top-[4px] right-0 text-xs text-warning">
            <slot></slot>
        </div>
    </a-form-item>
</template>

<style lang="scss" scoped></style>
