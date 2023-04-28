<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { onBeforeUnmount, shallowRef } from 'vue';

interface Props {
    modelValue: string;
    placeholder?: string;
    maxHeight?: string;
    autoFocus?: boolean;
    toolbarType?: 'none' | 'simple' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: '请输入内容...',
    maxHeight: '500px',
    autoFocus: true,
    toolbarType: 'default',
});

const editorRef = shallowRef(); // 编辑器元素

// 基础配置
const editorConfig: Partial<IEditorConfig> = {
    placeholder: props.placeholder,
    autoFocus: props.autoFocus,
    MENU_CONF: {
        blockquote: {
            hotKey: 'alt + t',
        },
    },
};

// 工具栏项
const toolbar = {
    default: [
        'lineHeight',
        'fontSize',
        'fontFamily',
        'blockquote',
        'group-more-style',
        'todo',
        'color',
        'bgColor',
        'group-justify',
        'group-indent',
        'emotion',
        'group-video',
        'insertTable',
        'divider',
        '|',
        'fullScreen',
    ],
    simple: ['lineHeight', 'fontSize', 'fontFamily', 'todo', 'group-justify', 'group-indent'],
};
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: props.toolbarType === 'default' ? toolbar.default : toolbar.simple,
};

// 上传图片
type InsertFnType = (url: string, alt: string, href: string) => void;
if (editorConfig.MENU_CONF)
    editorConfig.MENU_CONF['uploadImage'] = {
        // 图片上传地址
        server: env.VITE_URL + '/upload/img',
        // 参数名
        fieldName: 'file',
        // 单文件大小5M
        maxFileSize: 5 * 1024 * 1024,
        // 最大文件数
        maxNumberOfFiles: 2,
        // 文件类型
        allowedFileTypes: ['image/*'],
        // 请求头
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localCache.get('token'),
        },
        customInsert(res: any, insertFn: InsertFnType) {
            insertFn(res.data.url, '图片', '');
        },
    };

// 销毁前先失焦
onBeforeUnmount(() => {
    if (editorRef.value == null) return;
    editorRef.value.blur();
    editorRef.value.destroy();
});

// 导出方法
defineExpose({
    // 清空内容
    clear: () => {
        editorRef.value.clear();
    },
});
</script>

<template>
    <!-- 富文本编辑器 -->
    <section class="rich-editor-box z-[999] border border-primary">
        <Toolbar
            :defaultConfig="toolbarConfig"
            :editor="editorRef"
            mode="simple"
            :class="props.toolbarType === 'none' ? 'hidden' : ''"
        />
        <Editor
            :class="[
                '!h-auto',
                'overflow-x-hidden',
                'overflow-y-auto',
                `max-h-[${props.maxHeight}]`,
            ]"
            :defaultConfig="editorConfig"
            mode="simple"
            :model-value="props.modelValue"
            @onCreated="editorRef = $event"
            @onChange="
                $emit('update:modelValue', $event.getHtml());
                $emit('change', $event.getHtml());
            "
        />
    </section>
</template>

<style lang="scss" scoped></style>
