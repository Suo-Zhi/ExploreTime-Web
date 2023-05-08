<script setup lang="ts">
interface Props {
    text: string;
    textClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
    textClass: '',
});
</script>

<template>
    <section
        v-html="props.text"
        class="view-box content-text w-full h-full min-h-[8px]"
        :class="props.textClass"
    ></section>
</template>

<style lang="scss" scoped>
.view-box {
    display: flex;
    flex-direction: column;

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
