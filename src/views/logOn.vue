<template>
  <div id="log-on">
    <section>
      <div id="banner">
        <img :src="bannerImg" alt="" />
      </div>
    </section>
    <div style="background-color: red">
      <section class="myLoginContainer">
        <div class="layout">
          <el-tabs type="border-card">
            <el-tab-pane label="登录">
              <el-form
                label-position="right"
                label-width="60px"
                style="max-width: 460px"
                class="loginForm"
              >
                <el-form-item label="账号：">
                  <el-input v-model="form.account" />
                </el-form-item>
                <el-form-item label="密码：">
                  <el-input type="password" v-model="form.password" />
                </el-form-item>
                <el-form-item label="验证码">
                  <div class="v-code-container">
                    <el-input v-model="form.vcode" />
                    <img
                      :src="'http://efuny.top:8080/common/captcha' + yzm"
                      @click="refreshVcode"
                      class="v-code"
                    />
                  </div>
                </el-form-item>

                <!-- <el-row>
                <el-checkbox
                  class="checkBox"
                  v-model="isAgree"
                  label="同意用户使用准则"
                  name="type"
                />
              </el-row> -->
                <!-- v-if="isAgree" -->
                <el-button type="primary" class="loginBtn" @click="login">
                  登录
                </el-button>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="注册">
              <el-form
                label-position="right"
                label-width="100px"
                style="max-width: 460px"
                class="loginForm"
              >
                <el-form-item label="邮箱：">
                  <el-input v-model="registerForm.rEmail" />
                </el-form-item>
                <!-- <el-form-item label="用户名：">
                  <el-input v-model="rUserName" />
                </el-form-item> -->
                <el-form-item label="密码：">
                  <el-input type="password" v-model="registerForm.rPassword" />
                </el-form-item>
                <!-- <el-form-item label="手机号：">
                  <el-input v-model="rPhoneNum" />
                </el-form-item>
                <el-form-item label="密码：">
                  <el-input type="password" v-model="rPassword" />
                </el-form-item>
                <el-form-item label="确认密码：">
                  <el-input
                    type="password"
                    v-model="confirmPassword"
                    @blur="rPassword"
                    disabled
                  />
                </el-form-item>

                <el-form-item label="验证码：">
                  <el-row>
                    <el-input
                      type="password"
                      v-model="identifyCode"
                      class="inpWidth"
                    />
                    <el-button
                      type="primary"
                      @click="getIdentifyCode"
                      plain
                      disabled
                    >
                      获取验证码
                    </el-button>
                  </el-row>
                </el-form-item>

                <el-row>
                  <el-checkbox
                    class="checkBox"
                    v-model="rAgree"
                    label="同意用户使用准则"
                    name="type"
                  />
                </el-row> -->
                <!-- v-if="rAgree" -->
                <el-button type="primary" class="loginBtn" @click="register">
                  注册
                </el-button>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import bannerImg from "@/assets/images/home-page/home-page2.webp";
import store from "@/store/index.js"; // 导入 Vuex store
import api from "@/api/api.js";

const router = useRouter();
const bannerImage = ref(bannerImg);
const yzm = ref("");
//登录表单
const form = reactive({
  account: "1120148291@qq.com",
  password: "123",
  vcode: "",
  //   isAgree: 0,
});
//注册表单
const registerForm = reactive({
  rEmail: "",
  rPassword: "",
  //   vcode: "",
  //   confirmPassword: "",
  //   identifyCode: "",
  //   rAgree: 0,
});
//登录
async function login() {
  console.log(form);
  if (form.vcode == "") {
    console.log("无验证码");
    return;
  }
    const codeValue = await api.common.verfiyVcode(form.vcode);
//   const codeValue = true;
  if (codeValue === false) {
    console.log("验证码未通过");
  } else {
    const userData = {
      identifier: form.account,
      password: form.password,
    };
    const tokenValue = await api.common.login(userData);
    console.log("logOn得到的值");
    console.log(tokenValue);
    if (tokenValue === "400") {
      console.log("账号或者密码错误");
    } else {
      //设置token
      api.common.setAuthorization(tokenValue);
      api.common.setCookie("myToken", tokenValue, 7);
      router.push({
        path: "/PerInfo",
      });
    }
  }
  //   api.common
  //     .verfiyVcode(form.vcode)
  //     .then((response) => {
  //       console.log("成功执行接口：common.verfiyVcode");
  //       console.log(response);
  //       if (response.data.status == 0) {
  //         console.log("验证码校验成功");
  //         const userData = {
  //           identifier: form.account,
  //           password: form.password,
  //         };
  //         api.common
  //           .login(userData)
  //           .then((response) => {
  //             console.log("成功执行接口common.login");
  //             console.log(response);
  //             const token = response.data.data.jwt;
  //             store.commit("setJwt", token);
  //             store.commit("setCheckLogin", true);
  //             router.push({
  //               path: "/PerInfo",
  //             });
  //           })
  //           .catch((err) => {
  //             console.log("失败：");
  //             console.log(err);
  //             if (err.response.status == 400) {
  //               console.log("账号或密码错误");
  //             }
  //           });
  //       } else {
  //         console.log("验证码校验失败");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("失败：" + err);
  //     });
}
//注册
async function register() {
  console.log(registerForm);
  const myResult = await api.common.register(
    registerForm.rEmail,
    registerForm.rPassword
  );
  console.log(myResult);
}
// 验证码
function getIdentifyCode() {
  console.log("获取验证码");
}
function refreshVcode() {
  yzm.value = "?random=" + Math.random();
}
</script>

<style scoped>
#log-on {
  height: 700px;
}
#banner {
  position: relative;
}

#banner img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 700px; /* 或者其他你想要的高度 */
}
.myLoginContainer {
  position: relative;
  min-height: 700px;
  /* background-color: #f4f4f5; */
}
.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 400px;
}
.loginBtn {
  width: 100px;
}
.loginForm {
  text-align: center;
}
.checkBox {
  margin-left: 7px;
}
.inpWidth {
  width: 165px;
}
.v-code-container {
  display: flex;
}
.v-code {
  /* width: 100%; */
  /* height: 100%; */
}
</style>
