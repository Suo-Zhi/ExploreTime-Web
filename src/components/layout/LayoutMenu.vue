<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { IconType } from '@icon-park/vue-next/lib/all';

interface Props {
    switchTarget: 'camp' | 'square'; // 要切换的目标
    menuList: Menu[];
}

interface Menu {
    title: string;
    icon: IconType;
    isActive: boolean;
    routeName: string;
}

const props = withDefaults(defineProps<Props>(), {});

// 实时获取激活菜单项
const route = useRoute();
const activeRouteName = ref(''); // 当前激活项
watch(
    () => route.name,
    (newRouteName) => {
        activeRouteName.value = newRouteName as string;
    },
    { immediate: true }
);

// 切换菜单
const switchMenu = (menu: Menu) => {
    activeRouteName.value = menu.routeName;
    router.push({ name: menu.routeName });
};

// 退出登录
const router = useRouter();
const logout = () => {
    localCache.remove('token');
    router.push({ name: 'login' });
};
</script>

<template>
    <!-- 左侧菜单 -->
    <aside class="layout-nav flex flex-col justify-between items-center pt-1 pb-2 px-1 shadow-md">
        <!-- logo -->
        <div class="logo">
            <img src="/icon.svg" class="w-[30px] h-[30px]" />
            <!-- 分割线 -->
            <div class="my-2 px-1"><hr /></div>
        </div>
        <!-- 读者作者端切换按钮 -->
        <div class="module-switch shadow-sm hover:shadow-md bg-blue-50 duration-200 rounded-md p-1">
            <component
                :is="icons[props.switchTarget === 'camp' ? 'Camp' : 'TentBanner']"
                size="24"
                :strokeWidth="3"
                :title="props.switchTarget === 'camp' ? '营地' : '广场'"
                class="cursor-pointer text-primary"
                @click="$router.push({ name: props.switchTarget })"
            />
        </div>
        <!-- 具体菜单列表 -->
        <div class="menu-list flex-1 flex flex-col mt-10">
            <component
                v-for="(menu, index) of props.menuList"
                :key="index"
                :is="icons[menu.icon]"
                size="24"
                :strokeWidth="3"
                :title="menu.title"
                class="cursor-pointer hover:text-primary mb-2"
                :class="activeRouteName === menu.routeName ? 'text-primary' : 'text-icon-gray'"
                @click="switchMenu(menu)"
            />
        </div>
        <!-- 我的 -->
        <div class="my">
            <a-popover position="rb" :content-style="{ paddingTop: '2px', paddingBottom: '7px' }">
                <icon-me size="26" :strokeWidth="3" class="cursor-pointer text-icon-gray" />
                <template #content>
                    <div
                        class="border-b border-gray-300 pb-1 cursor-pointer hover:text-primary duration-300"
                    >
                        个人信息
                    </div>
                    <div
                        class="pt-1 cursor-pointer hover:text-primary duration-300"
                        @click="logout"
                    >
                        退出登录
                    </div>
                </template>
            </a-popover>
        </div>
    </aside>
</template>

<style lang="scss" scoped></style>
