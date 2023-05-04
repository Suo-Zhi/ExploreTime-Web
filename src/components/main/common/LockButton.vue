<script setup lang="ts">
import * as icons from '@icon-park/vue-next';

interface Props {
    isPublic: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div class="lock-button group">
        <component
            :is="props.isPublic ? icons['Unlock'] : icons['Lock']"
            size="18"
            :strokeWidth="3"
            class="action-btn group-hover:hidden"
        ></component>
        <component
            :is="props.isPublic ? icons['Lock'] : icons['Unlock']"
            size="18"
            :strokeWidth="3"
            :title="props.isPublic ? '私有' : '公开'"
            class="text-primary cursor-pointer hidden group-hover:block"
        ></component>
    </div>
</template>

<style lang="scss" scoped></style>
