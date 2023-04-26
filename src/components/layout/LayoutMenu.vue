<script setup lang="ts">
import * as icons from '@icon-park/vue-next';
import { Menu, SkipTarget } from './types';

interface Props {
    skipTarget: SkipTarget; // 要切换的目标
    menuList: Menu[];
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

// 切换折叠状态
const isFold = ref(store.setting().isFoldMenu);
watch(isFold, () => {
    store.setting().isFoldMenu = isFold.value;
    localCache.set('isFoldMenu', isFold.value);
});

// 用户信息(用于头像)
const { userinfo } = store.user();

// 退出登录
const router = useRouter();
const logout = () => {
    localCache.remove('token');
    router.push({ name: 'login' });
};
</script>

<template>
    <div class="relative group duration-200" :class="isFold ? 'w-[1px]' : 'w-[40px]'">
        <!-- 左侧菜单 -->
        <aside
            class="layout-nav min-h-full flex flex-col justify-between items-center pt-1 pb-2 px-1 shadow-md"
            v-show="!isFold"
        >
            <!-- logo -->
            <div class="logo">
                <img src="/icon.svg" class="w-[30px] h-[30px]" />
                <!-- 分割线 -->
                <div class="my-2 px-1"><hr /></div>
            </div>
            <!-- 读者作者端切换按钮 -->
            <div
                class="module-switch shadow-sm hover:shadow-md bg-blue-50 duration-200 rounded-md p-1"
            >
                <component
                    :is="icons[props.skipTarget === 'camp' ? 'Camp' : 'TentBanner']"
                    size="24"
                    :strokeWidth="3"
                    :title="props.skipTarget === 'camp' ? '营地' : '广场'"
                    class="cursor-pointer text-primary"
                    @click="$router.push({ name: props.skipTarget })"
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
                <a-popover
                    position="rb"
                    :content-style="{ paddingTop: '2px', paddingBottom: '7px' }"
                >
                    <avatar :img="userinfo?.avatar" :text="userinfo?.nickname" size="30px"></avatar>
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

        <!-- 折叠按钮 -->
        <component
            :is="icons['LeftOne']"
            @click="isFold = !isFold"
            :class="[isFold ? '-rotate-180 -right-[11px]' : '-right-[6px]']"
            size="18"
            :strokeWidth="3"
            theme="filled"
            class="fold-btn absolute text-primary cursor-pointer group-hover:block hidden top-1/2 -translate-y-1/2"
        ></component>
    </div>
</template>

<style lang="scss" scoped></style>
