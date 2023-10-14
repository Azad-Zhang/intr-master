import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/index.js'; // 导入 Vuex store
import api from "@/api/api.js";


const routes = [
	{ path: "/", component: () => import("@/views/index.vue"), meta: { title: "主页", name: 'index' } },
	{ path: "/logOn", component: () => import("@/views/logOn.vue"), meta: { title: "登录", name: 'logOn' } },
	{ path: "/perInfo", component: () => import("@/views/perInfo.vue"), meta: { title: "个人信息", name: 'perInfo' } },
	{ path: "/recruit", component: () => import("@/views/recruit.vue"), meta: { title: "人才市场", name: 'recruit' } },
	{ path: "/jobIntr", component: () => import("@/views/jobIntr.vue"), meta: { title: "岗位详情", name: 'jobIntr' } },
	// 其他路由配置
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});
// 导航守卫用于修改页面标题
router.beforeEach(async (to, from, next) => {
	// console.log("导航看路径");
	// console.log(to);
	// console.log(to.path);
	//已经登录过的
	// if(to.path === '/' && store.state.checkLogin == true){
	if (to.path === '/') {
		const tokenValue = api.common.getCookie('myToken');
		var test = api.common.setAuthorization(tokenValue);
		var myResult = api.common.getUserInfo();
	}
	if (to.path === '/jobIntr') {
		console.log("看看当前登录没有");
		const isLogin = store.state.checkLogin;
		if (isLogin == false) {
			next("/logOn")
		}
	}

	if (to.path === '/LogOn') {
		// 执行特定设置，例如显示特定组件、加载特定数据等
		// console.log('进入LogOn页面，执行特定设置');
		store.commit("setIsLoggedIn", true);
		// console.log("设置成功：" + store.state.isLoggedIn);
	}
	if (to.path === '/PerInfo') {
		const tokenValue = api.common.getCookie('myToken');
		// console.log(tokenValue);
		//这代表从登录页面登录进入
		if (tokenValue != null) {
			var test = api.common.setAuthorization(tokenValue);
			var result = await api.common.getUserInfo();
		}
	}
	//表示未通过登录进入需要登录的页面
	// if (to.path === '/PerInfo' && store.state.checkLogin == false) {
	// }
	document.title = to.meta.title || "默认标题"; // 设置页面标题
	next();
});

router.beforeEach((to, from, next) => {
	// 如果离开的是/LogOn页面
	if (from.path === '/LogOn') {
		// 执行特定设置，例如隐藏特定组件、保存用户数据等
		console.log('离开LogOn页面，执行特定设置');
		store.commit("setIsLoggedIn", false);
		console.log("设置成功：" + store.state.isLoggedIn);
	}

	next();
});

export default router;