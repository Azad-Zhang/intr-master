import { createStore } from 'vuex';

const store = createStore({
	state: {
		// 状态变量
		isLoggedIn: false, // 初始状态为未登录
		jwt: "null",
		checkLogin: false,//用户是否登录
		isWhoLogin: "null",
		userInfo: {},
	},
	mutations: {
		// 修改状态的方法
		setIsLoggedIn(state, value) {
			state.isLoggedIn = value;
		},
		setJwt(state, token) {
			state.jwt = token;
		},
		setCheckLogin(state, value) {
			state.checkLogin = value;
		},
		setWhoLogin(state, value) {
			state.isWhoLogin = value;
		},
		setUserInfo(state, value) {
			state.userInfo = value;
		},
	},
	actions: {
		// 异步操作和业务逻辑
	},
	getters: {
		// 计算属性
	}
});

export default store;