<script setup lang="ts">
const info = ref('');

const editorRef = ref<any>(null);
const emit = defineEmits(['refreshList']);
const confirmHandle = async () => {
    // 判空
    if (tool.isEmpty(info.value, '有效信息')) return;

    // 新增信息
    await api.info.create({ content: info.value }).then(() => {
        editorRef.value?.clear(); // 清空输入框
        emit('refreshList'); // 刷新信息列表
    });
};
</script>

<template>
    <section class="input-info-bar absolute bottom-[33px] w-full flex justify-end">
        <cus-editor
            class="w-full"
            placeholder="按 Ctrl+Enter 新增信息"
            toolbarType="none"
            v-model="info"
            @keyup.ctrl.enter="confirmHandle"
            ref="editorRef"
        ></cus-editor>
    </section>
</template>

<style lang="scss" scoped>
.input-info-bar {
    margin: 0 8px 4px;
    width: calc(100% - 16px);
    ::v-deep .w-e-text-container {
        border: 2px solid $color-primary;
        border-radius: 10px;
    }
}
::v-deep .rich-editor-box {
    border: none;
}
</style>
