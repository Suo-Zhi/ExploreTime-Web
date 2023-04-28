<script setup lang="ts">
import moment from 'moment';

interface Props {
    createTime: any;
    updateTime?: any;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <!-- 时间显示块 -->
    <section class="time-bar w-16 text-xs text-gray-600">
        <a-tooltip position="right" background-color="#3491FA">
            <div class="base-time">{{ moment(props.createTime).format('YYYY-MM-DD') }}</div>
            <template #content>
                <div v-if="updateTime" class="detail-time !text-xs">
                    <div class="create-time">
                        创建时间: {{ moment(props.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                    </div>
                    <div class="update-time">
                        更新时间: {{ moment(props.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
                    </div>
                </div>
            </template>
        </a-tooltip>
    </section>
</template>

<style lang="scss" scoped></style>
