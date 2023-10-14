// api.js

import axios from 'axios';
import store from '../store';

const baseURL = '/api'; // 修改为你的后端API地址
axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json'; // 如果需要设置特定请求方法的请求头，可以在这里设置
axios.defaults.timeout = 5000; // 5000毫秒（即5秒钟）

// let axios = axios.create({
// 	baseURL: baseURL,
// 	timeout: 10000, // 超时时间
// 	headers: {
// 		'Content-Type': 'application/json',
// 		// 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiZXhwIjoxNjk3Mzg3Mzc4LCJuYmYiOjE2OTY3ODI1MTh9.e5lp36fXeRzXMAFPAeK72sPCBOHwnt6PAUs6bxXL47o'
// 	},
// });


const api = {
	common: {
		async login(userData) {
			try {
				console.log("登录得到的数值");
				console.log(userData);
				const response = await axios.post('/common/login', userData);
				console.log("/common/login运行成功");
				console.log("得到的response");
				const token = response.data.data.jwt;
				console.log(token);
				return token;
			} catch (error) {
				console.log("/common/login运行报错");
				if (error.response && error.response.status === 400) {
					console.log("账号或密码错误");
					return "400";
				}
				console.log("api.common.login报错");
				console.log(error);
				return "400";
			}
		},
		async register(identifier, password) {
			try {
				console.log("注册得到的数值");
				const myData = {
					identifier: identifier,
					password: password,
				};
				console.log(myData);
				const response = await axios.post('/common/register', myData);
				console.log("register运行成功");
				console.log("得到的response");
				console.log(response);
				return true;
			} catch (error) {
				console.log("register运行失败");
				console.log(error);
				return false;
			}
		},
		setAuthorization(token) {
			// console.log("得到的token");
			// console.log(token);
			// console.log("看一下defaultAxios");
			// console.log(axios);

			// console.log(axios.Authorization);
			// axios.headers.Authorization = token;
			axios.defaults.headers.common['Authorization'] = token;

			return "设置完成";
			// // axios.headers.Authorization = token;
			// axios.headers.common['Authorization'] = `${token}`;
		},
		async getUserInfo() {
			try {
				const response = await axios.get('/user');
				// console.log("登录得到的结果");
				// console.log(response);
				if (response.data.data.base.userRole == 1) {
					// console.log("当前登录的是学生用户");
					store.commit("setWhoLogin", "student");
				} else {
					// console.log("登录的是公司用户");
					store.commit("setWhoLogin", "company");
				}
				store.commit("setUserInfo", response.data.data);
				store.commit("setCheckLogin", true);
				return true;
			} catch (error) {
				console.log("getUserInfo运行失败");
				console.log(error);
				return false;
			}

		},
		getVcode() {
			return axios.get('/common/captcha');
		},
		async verfiyVcode(code) {
			try {
				const response = await axios.get(`/captcha/verify/${code}`);
				console.log("验证验证码");
				console.log(response);
				if (response.data.status === 1) {
					console.log("验证码与图像不符");
					return false;
				} else {
					return true;
				}
			} catch (error) {
				console.log("api.common.verfiyVcode报错");
				console.log(error);
				return false;
			}
		},
		// 可以添加其他 common 分组的 API 请求方法
		setCookie(name, value, days) {
			const expires = new Date();
			expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
			document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
		},
		getCookie(name) {
			const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
			return cookieValue ? cookieValue.pop() : null;
		},
		deleteCookie(name) {
			document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		},
		async getAllPositions() {
			try {
				const response = await axios.get(`/common/positions`);
				console.log("getAllPositions成功");
				console.log(response.data.data);
				return response.data.data;
			} catch (error) {
				console.log("getAllPositions报错");
				console.log(error);
				return false;
			}
		},
		async getPosition(pid) {
			try {
				const response = await axios.get(`/common/positions/${pid}`);
				console.log("getPosition成功");
				console.log(response.data.data);
				return response.data.data;
			} catch (error) {
				console.log("getPosition报错");
				console.log(error);
				return false;
			}
		},
		async getCompany(cid) {
			try {
				const response = await axios.get(`/common/company/${cid}`);
				console.log("getCompany成功");
				console.log(response.data.data);
				return response.data.data;
			} catch (error) {
				console.log("getCompany报错");
				console.log(error);
				return false;
			}
		},
		async getAllNotice() {
			try {
				const response = await axios.get(`/notice`);
				// console.log("getAllNotice");
				// console.log(response.data);
				return response.data;
			} catch (error) {
				console.log("getCompany报错");
				console.log(error);
				return false;
			}
		}
	},

	user: {
		async uploadAvatar(userData) {
			try {

				console.log("得到的userData");
				console.log(userData);
				// 创建 FormData 对象
				const formData = new FormData();

				// 将 fileData 添加到 FormData 对象中
				formData.append('file', userData); // 'file' 是服务器端接受文件的字段名称
				console.log("看看formData");
				console.log(formData.get('file'));
				const response = await axios.post('/user/avatar', formData, {
					headers: {
						'Content-Type': 'multipart/form-data' // 设置Content-Type为multipart/form-data，表示表单数据
					}
				});
				console.log("uploadAvatar执行成功");
				console.log(response);
				return response.data.data;
			} catch (error) {
				console.log("uploadAvatar执行失败");
				console.log(error);
				return false;
			}

		},
		async renewUserInfo(userData) {
			try {
				const myData = {
					nickName: userData.nickName,
					gender: userData.gender == "男" ? 0 : 1,
					birthday: userData.birthday,
					signature: userData.signature,
					userRole: userData.userRole,
				}
				console.log("得到的数据");
				console.log(myData);
				const response = await axios.put('/user', myData);
				console.log("renewUserInfo执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewUserInfo执行失败");
				console.log(error);
				return false;
			}
		},
		async renewPassword(oldPass, newPass) {
			try {
				const myData = {
					oldPass: oldPass,
					newPass: newPass
				}
				const response = await axios.put('/user/pass', myData);
				console.log("renewPassword执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewPassword执行失败");
				console.log(error);
				return false;
			}
		},
		async renewPhoneNum(phone) {
			try {
				const myData = {
					mobile: phone,
				}
				const response = await axios.put('/user/phone', myData);
				console.log("renewPhoneNum执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewPhoneNum执行失败");
				console.log(error);
				return false;
			}
		},
		async renewEmail(email) {
			try {
				const myData = {
					email: email,
				}
				const response = await axios.put('/user/email', myData);
				console.log("renewEmail执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewEmail执行失败");
				console.log(error);
				return false;
			}
		},
		async authenStuInfo(userData) {
			console.log("得到的数据");
			console.log(userData);
			try {
				const myData = {
					stuId: userData.stuId,
					name: userData.name,
					admissionDate: userData.admissionDate,
					graduationTime: userData.graduationTime,
					school: userData.school,
					college: userData.college,
					major: userData.major,
					qualification: userData.qualification,
				}
				const response = await axios.put('/user/stu', myData);
				console.log("authenStuInfo执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("authenStuInfo执行失败");
				console.log(error);
				return false;
			}
		},
		async getAllCollections() {
			try {
				const response = await axios.get('/user/collections');
				console.log("getAllCollections执行成功");
				console.log(response);
				return response.data.data;
			} catch (error) {
				console.log("getAllCollections执行失败");
				console.log(error);
				return false;
			}
		},
		async addCollections(userData) {
			try {
				const myData = {
					remark: userData.remark,
					name: userData.name,
				}
				const response = await axios.post('/user/collections', myData);
				console.log("addCollections执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("addCollections执行失败");
				console.log(error);
				return false;
			}
		},
		async addPositionsToColl(id, type, value) {
			try {
				const myData = {
					type: type,
					value: value,
				}
				const response = await axios.post(`/user/collections/data/${id}`, myData);
				console.log("addPositionsToColl执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("addPositionsToColl执行失败");
				console.log(error);
				return false;
			}
		},
		async deletePositionsToColl(id, type, value) {
			try {

				const myData = {
					type: type,
					value: value,
				}
				console.log(myData);
				const response = await axios.delete(`/user/collections/data/${id}`, myData);
				console.log("deletePositionsToColl执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("deletePositionsToColl执行失败");
				console.log(error);
				return false;
			}
		},
		async toPidGetPositions(pid) {
			try {

				const response = await axios.get(`/user/position/browse/${pid}`);
				console.log("toPidGetPositions执行成功");
				console.log(response.data.data);
				return response.data.data;
			} catch (error) {
				console.log("deletePositionsToColl执行失败");
				console.log(error);
				return false;
			}
		},
		async renewCollectionInfo(id, name, remark) {
			try {
				const myData = {
					remark: remark,
					name: name,
				}
				const response = await axios.put(`/user/collections/${id}`, myData);
				console.log("renewCollectionInfo执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewCollectionInfo执行失败");
				console.log(error);
				return false;
			}
		},
		async getCollsInfo(userData) {
			try {
				let conStr = "";
				for (let i = 0; i < userData.length; i++) {
					if (i != userData.length - 1) {
						conStr += "colIds=" + userData[i] + "&";
					}
					else {
						conStr += "colIds=" + userData[i];
					}
				}
				// console.log("输出连接字符串");
				// console.log(conStr);
				const response = await axios.get(`/user/collections/data?${conStr}`);
				console.log("getCollsInfo执行成功");
				console.log(response);
				console.log(response.data.data);
				const data = response.data.data.data;
				const detail = response.data.data.detail;
				let toReturn = [];
				for (let i = 0; i < response.data.data.data.length; i++) {
					if (data[i].type == "2") {
						for (let j = 0; j < detail.length; j++) {
							if (detail[j].pid == data[i].position_id) {
								toReturn.push({ collection_id: data[i].collection_id, Info: detail[j] })
							}
						}
					}
				}
				console.log("最后得到的数据");
				console.log(toReturn);
				return toReturn;
			} catch (error) {
				console.log("getCollsInfo执行失败");
				console.log(error.response.data);
				return false;
			}
		},
		async addHistoryPosition(pid) {
			try {
				const response = await axios.get(`/user/position/browse/${pid}`);
				console.log("addHistoryPosition执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("addHistoryPosition执行失败");
				console.log(error);
				return false;
			}
		},
		async deleteHistoryPosition(pid) {
			try {
				const form = new FormData();
				form.append("id", pid);
				const response = await axios.delete(`/user/history/position`, form, {
					headers: {
						'Content-Type': 'multipart/form-data' // 设置Content-Type为multipart/form-data，表示表单数据
					}
				});
				console.log("deleteHistoryPosition执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("deleteHistoryPosition执行失败");
				console.log(error);
				return false;
			}
		},
		async getAllHistoryPosition() {
			try {
				const response = await axios.get(`/user/history/position`);
				console.log("getAllHistoryPosition执行成功");
				console.log(response);
				return response.data.data.positions;
			} catch (error) {
				console.log("getAllHistoryPosition执行失败");
				console.log(error);
				return false;
			}
		}
		// 可以添加其他 user 分组的 API 请求方法
	},

	company: {
		async renewCompanyInfo(userData) {
			try {
				const myData = {
					name: userData.name,
					avatar: userData.avatar,
					desc: userData.desc,
					area: userData.area,
					product: userData.product,
					video: userData.video,
					size: userData.size,
					sector: userData.sector,
					financing: userData.financing,
					treatment: userData.treatment,
				}
				const response = await axios.put(`/company`, myData);
				console.log("renewCompanyInfo执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewCompanyInfo执行失败");
				console.log(error);
				return false;
			}
		},
		async getAlbum(id) {
			try {
				const response = await axios.get(`/common/company/images/${id}`);
				console.log("getAlbum执行成功");
				console.log(response.data.data);
				return response.data.data;
			} catch (error) {
				console.log("getAlbum执行失败");
				console.log(error);
				return false;
			}
		},
		async uploadAlbum(userData) {
			try {
				// console.log("看看传递过来的数据");
				// console.log(userData);
				const formData = new FormData();

				// 将 fileData 添加到 FormData 对象中
				formData.append('images', userData); // 'file' 是服务器端接受文件的字段名称
				// console.log("看看formData");
				// console.log(formData.get('images'));
				const response = await axios.post(`/company/images`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data' // 设置Content-Type为multipart/form-data，表示表单数据
					}
				});
				console.log("uploadAlbum执行成功");
				console.log(response.data.data[0]);
				return response.data.data[0];
			} catch (error) {
				console.log("uploadAlbum执行失败");
				console.log(error);
				return false;
			}
		},
		async deleteAlbum(id) {
			try {
				console.log("看看传递过来的数据");
				console.log(id);

				const response = await axios.delete(`/company/images/${id}`);
				console.log("deleteAlbum执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("deleteAlbum执行失败");
				console.log(error);
				return false;
			}
		},
		async getAllPositions(id) {
			try {
				console.log("看看传递过来的数据");
				console.log(id);

				const response = await axios.get(`/common/positions/company/${id}`);
				console.log("getAllPositions执行成功");
				console.log(response);
				return response.data.data;
			} catch (error) {
				console.log("getAllPositions执行失败");
				console.log(error);
				return false;
			}
		},
		async upPositions(userData) {
			try {
				console.log("看看传递过来的数据");
				console.log(userData);

				const response = await axios.post(`/company/positions`, userData);
				console.log("upPositions执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("upPositions执行失败");
				console.log(error);
				return false;
			}
		},
		async renewPositions(pid, userData) {
			try {
				console.log("看看传递过来的数据");
				console.log(userData);

				const response = await axios.put(`/company/positions/${pid}`, userData);
				console.log("renewPositions执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("renewPositions执行失败");
				console.log(error);
				return false;
			}
		},
		async deletePositions(pid) {
			try {
				const response = await axios.delete(`/company/positions?pid=${pid}`);
				console.log("deletePositions执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("deletePositions执行失败");
				console.log(error);
				return false;
			}
		},
		async getPositions(pid) {
			try {
				const response = await axios.delete(`/company/positions?pid=${pid}`);
				console.log("getPositions执行成功");
				console.log(response);
				return true;
			} catch (error) {
				console.log("getPositions执行失败");
				console.log(error);
				return false;
			}
		}

		// 可以添加其他 company 分组的 API 请求方法
	}
};

export default api;
