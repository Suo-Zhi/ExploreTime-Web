<script setup lang="ts">
const info = ref('');
</script>

<template>
    <section class="input-info-bar absolute bottom-[33px] w-full flex justify-end">
        <cus-editor
            class="w-full"
            placeholder="按 Ctrl+Enter 新增信息"
            toolbarType="none"
            v-model="info"
            @keyup.ctrl.enter="$emit('addInfo', info)"
            ref="editorRef"
        ></cus-editor>
    </section>
</template>

<style lang="scss" scoped>
.input-info-bar {
    margin: 0 8px 4px;
    width: calc(100% - 16px);
    ::v-deep .w-e-text-container {
        border: 3px solid $color-primary;
        border-radius: 10px;
    }
}
::v-deep .rich-editor-box {
    border: none;
}
</style>
