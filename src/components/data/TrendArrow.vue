<script setup lang="ts">
import * as icons from '@icon-park/vue-next';

interface Props {
    firstData: number;
    secondData: number;
    secondTitle: string;
}

const props = withDefaults(defineProps<Props>(), {});

const sum = computed(() => {
    return props.firstData - props.secondData;
});
</script>

<template>
    <!-- 数据变化趋势 -->
    <a-popover
        v-if="sum !== 0"
        position="right"
        :content-style="{ paddingTop: '2px', paddingBottom: '7px' }"
    >
        <component
            :is="icons[sum > 0 ? 'UpOne' : 'DownOne']"
            size="18"
            :strokeWidth="3"
            theme="filled"
            :class="sum > 0 ? 'text-green-400' : 'text-red-400'"
        ></component>
        <template #content>
            较{{ props.secondTitle }}{{ sum > 0 ? '增长' : '减少' }}
            <span :class="sum > 0 ? 'text-green-400' : 'text-red-400'">{{ Math.abs(sum) }}</span>
        </template>
    </a-popover>
</template>

<style lang="scss" scoped></style>
