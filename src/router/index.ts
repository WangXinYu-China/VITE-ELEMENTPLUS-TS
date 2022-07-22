import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    },{
        path: "/",
        name: "Index",
        component: layout,
        children: [
            {
                path: "/home",
                name: "Home",
                meta: {
                    title: '系统首页'
                },
                component: () => import ("@/views/Home/index.vue")
            },{
                path: "/table",
                name: "Table",
                meta: {
                    title: '表格组件'
                },
                component: () => import ("@/views/Table/index.vue")
            }
        ]
    },{
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import("@/views/login/index.vue"), // 懒加载组件
    }
];

const router = createRouter({
    /**
     * hash路由    history: createWebHashHistory(),
     */
    history: createWebHistory(),
    routes,
});
/**  */
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | MNGS`;
    next();
});

export default router;
