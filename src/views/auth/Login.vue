<script setup lang="ts">
import { LoginDTO } from '@/api/auth/types';

// 表单验证
const schema = {
    id: yup.string().required().label('账号'),
    password: yup.string().required().label('密码'),
};
const { values, errors, handleSubmit } = useForms(schema);

// 获取刚注册的账号
onMounted(() => {
    const { userId } = useRoute().query;
    if (userId) values.id = userId;
});

// 登录
const isLoading = ref<boolean>(false);
const router = useRouter();
const onSubmit = handleSubmit(async () => {
    isLoading.value = true;
    try {
        const res = await api.auth.login(values as LoginDTO);
        localCache.set('token', res.data.token, 60 * 60 * 24 * 7);
        store.global().prompt('登录成功', 'success');
        router.push({ name: 'workbench' });
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <!-- 登录页面 -->
    <div class="register-box w-[340px] bg-white rounded-md flex flex-col px-6 pt-4 pb-8">
        <!-- 表单头部 -->
        <div class="form-header flex flex-col items-center mb-4">
            <img src="/icon.svg" class="w-[100px] h-[100px]" />
            <span class="text-2xl text-nhtl-gray-700 mt-1 mb-4">登录你的账号</span>
        </div>
        <!-- 登录表单 -->
        <a-form :model="{ name: 'loginForm' }" layout="vertical">
            <!-- 账号 -->
            <form-item label="账号" v-model="values.id" placeholder="请输入您的账号" :order="1">
                <span>{{ errors.id }}</span>
            </form-item>

            <!-- 密码 -->
            <form-item
                type="password"
                label="密码"
                v-model="values.password"
                placeholder="请输入您的密码"
                :order="2"
                :enterCallback="onSubmit"
            >
                <span>{{ errors.password }}</span>
            </form-item>

            <!-- 选项 -->
            <div class="flex justify-between -mt-3">
                <router-link to="admin" class="text-primary">管理员登录</router-link>
                <router-link to="register" class="text-primary">前往注册</router-link>
            </div>
            <!-- 登录按钮 -->
            <a-button type="primary" class="mt-5" :loading="isLoading" @click="onSubmit">
                登录
            </a-button>
        </a-form>
    </div>
</template>

<style lang="scss" scoped></style>
