<script setup lang="ts">
interface Props {
    value: string; // 显示值
    isEdit: boolean; // 是否切换为编辑状态
    placeholder: string;
}
const props = withDefaults(defineProps<Props>(), {
    isEdit: false,
});

const newValue = ref(props.value);
</script>

<template>
    <section class="edit-item w-full">
        <!-- 编辑模式 -->
        <div v-if="props.isEdit" class="relative z-50">
            <cus-editor :placeholder="props.placeholder" v-model="newValue"></cus-editor>
        </div>

        <!-- 浏览模式 -->
        <div
            v-else
            v-html="props.value"
            class="view-box w-full h-full min-h-[8px]"
            @dblclick.stop="$emit('editOpen')"
        ></div>

        <!-- 编辑蒙版 -->
        <div
            class="fixed min-h-screen w-screen bg-transparent z-40 top-0 left-0"
            :class="isEdit ? 'block' : 'hidden'"
            @dblclick="$emit('editClose', newValue)"
        ></div>
    </section>
</template>

<style lang="scss" scoped>
.view-box {
    display: flex;
    flex-direction: column;
    line-height: 24px;

    blockquote {
        margin-top: 2px;
        color: #7f8e99;
    }

    ul {
        display: block;
        li {
            position: relative;
            padding-left: 10px;
            &:after {
                // 形状
                content: '';
                width: 5px;
                height: 5px;
                background: #555;
                border-radius: 50%;

                // 位置
                display: block;
                position: absolute;
                top: 6px;
                left: 1px;
            }
        }
    }

    ol {
        li {
            position: relative;
            padding-left: 10px;
            &:after {
                // 形状
                content: '';
                width: 5px;
                height: 5px;
                background: #555;
                border-radius: 50%;

                // 位置
                display: block;
                position: absolute;
                top: 6px;
                left: 1px;
            }
        }
    }
}
</style>
