<script setup lang="ts">
const schema = {
    id: yup.string().required().label('账号'),
    password: yup.string().required().label('密码'),
};
const initValue = ['tom', '123'];
const { values, errors, handleSubmit } = useForms(schema, initValue);

const onSubmit = handleSubmit(() => {
    console.log('表单验证通过');
});
</script>

<template>
    <form name="loginForm" @submit="onSubmit">
        <label>
            账号:
            <input type="text" v-model="values.id" />
            {{ errors.id }}
        </label>

        <label>
            密码:
            <input type="password" v-model="values.password" />
            {{ errors.password }}
        </label>

        <button>登录</button>
    </form>
</template>

<style lang="scss" scoped></style>
