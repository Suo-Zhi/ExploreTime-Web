<script setup lang="ts">
const schema = {
    id: yup
        .string()
        .required()
        .max(20)
        .matches(/^[\w-]*$/, '账号只能使用字母、数字、_和-')
        .label('账号'),
    nickname: yup.string().required().max(15).label('昵称'),
    password: yup
        .string()
        .required()
        .min(3)
        .max(20)
        .matches(/^[\w-]*$/, '密码只能使用字母、数字、_和-')
        .label('密码'),
    password_confirm: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], '两次密码输入不一致')
        .label('确认密码'),
};
const { values, errors, handleSubmit } = useForms(schema);

const isLoading = ref<boolean>(false);
const router = useRouter();
const onSubmit = handleSubmit(async () => {
    isLoading.value = true;
    try {
        store.global().prompt('注册成功', 'success');
        router.push({ name: 'login', query: { userId: values.id } });
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <!-- 注册页面 -->
    <div class="register-box w-[340px] bg-white rounded-md flex flex-col px-6 pt-4 pb-8">
        <!-- 表单头部 -->
        <div class="form-header flex flex-col items-center mb-4">
            <img src="/icon.svg" class="w-[100px] h-[100px]" />
            <span class="text-2xl text-nhtl-gray-700 mt-1 mb-4">注册你的账号</span>
        </div>
        <!-- 注册表单 -->
        <a-form :model="{ name: 'registerForm' }" layout="vertical">
            <!-- 账号 -->
            <form-item label="账号" v-model="values.id" placeholder="请设置您的账号" :order="1">
                <span v-if="!errors.id" class="text-gray-400">账号可使用字母、数字、_和-</span>
                <span>{{ errors.id }}</span>
            </form-item>

            <!-- 昵称 -->
            <form-item
                label="昵称"
                v-model="values.nickname"
                placeholder="请设置您的昵称"
                :order="2"
            >
                <span>{{ errors.nickname }}</span>
            </form-item>

            <!-- 密码 -->
            <form-item
                type="password"
                label="密码"
                v-model="values.password"
                placeholder="请设置您的密码"
                :order="3"
            >
                <span v-if="!errors.password" class="text-gray-400">
                    密码可使用字母、数字、_和-
                </span>
                <span>{{ errors.password }}</span>
            </form-item>

            <!-- 确认密码 -->
            <form-item
                type="password"
                label="确认密码"
                v-model="values.password_confirm"
                placeholder="请再次输入您的密码"
                :order="4"
                :enterCallback="onSubmit"
            >
                <span>{{ errors.password_confirm }}</span>
            </form-item>

            <!-- 选项 -->
            <div class="text-right -mt-3">
                <router-link to="login" class="text-primary">前往登录</router-link>
            </div>

            <!-- 注册按钮 -->
            <a-button type="primary" class="mt-5" :loading="isLoading" @click="onSubmit">
                注册
            </a-button>
        </a-form>
    </div>
</template>

<style lang="scss" scoped></style>
