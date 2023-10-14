<template>
  <div id="account-set">
    <el-card class="Basic-Info-card">
      <template #header>
        <div class="card-header">
          <span>账号设置</span>
        </div>
      </template>
      <ul class="form">
        <li>
          <span class="left">
            <span>密</span>
            <span>码</span>
          </span>
          <p class="right">
            <!-- <span>密码安全性过低，请重新设置密码</span> -->
            <a
              href="javascript:void(0)"
              @click="state.situation[0].isShow = true"
              >修改密码</a
            >
          </p>
        </li>
        <li>
          <span class="left">
            <span>手</span>
            <span>机</span>
          </span>
          <p class="right">
            <span>绑定手机</span>
            <a
              href="javascript:void(0)"
              @click="state.situation[1].isShow = true"
              >修改手机</a
            >
          </p>
        </li>
        <li>
          <span class="left">
            <span>邮</span>
            <span>箱</span>
          </span>
          <p class="right">
            <span>修改邮箱</span>
            <a
              href="javascript:void(0)"
              @click="state.situation[2].isShow = true"
              >修改邮箱</a
            >
          </p>
        </li>
        <!-- <li>
          <span class="left">
            <span>三</span>
            <span>方</span>
            <span>账</span>
            <span>号</span>
          </span>
          <p class="right"><span></span> <a href="#">绑定/接触</a></p>
        </li> -->
        <li>
          <span class="left">
            <span>登</span>
            <span>录</span>
            <span>记</span>
            <span>录</span>
          </span>
          <p class="right">
            <span></span>
            <a href="javascript:void(0)" @click="ShowOrder()">查看记录</a>
          </p>
        </li>
        <li>
          <span class="left">
            <span>账</span>
            <span>号</span>
            <span>注</span>
            <span>销</span>
          </span>
          <p class="right">
            <span></span>
            <a
              href="javascript:void(0)"
              @click="state.situation[4].isShow = true"
              >立即注销</a
            >
          </p>
        </li>
      </ul>
    </el-card>
    <el-dialog
      v-for="item in state.situation"
      :key="item.id"
      v-model="item.isShow"
    >
      <el-result
        style="height: 500px"
        :icon="item.icon"
        :title="item.titp"
        :sub-title="item.English"
      >
        <template #extra>
          <el-form :model="item" v-if="item.id == 0">
            <el-form-item label="旧密码">
              <el-input v-model="item.oldPass" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="item.newPass" />
            </el-form-item>
          </el-form>
          <el-form :model="item" v-else-if="item.id == 1">
            <el-form-item label="旧电话">
              <el-input v-model="item.oldPhone" disabled />
            </el-form-item>
            <el-form-item label="新电话">
              <el-input v-model="item.newPhone" />
            </el-form-item>
          </el-form>
          <el-form :model="item" v-else-if="item.id == 2">
            <el-form-item label="旧邮箱">
              <el-input v-model="item.oldEmail" disabled />
            </el-form-item>
            <el-form-item label="新邮箱">
              <el-input v-model="item.newEmail" />
            </el-form-item>
          </el-form>
          <div v-if="item.id != 5">
            <el-button @click="item.isShow = false">取消</el-button>
            <el-button
              type="primary"
              @click="methods.ToChangePwd()"
              v-if="item.id == 0"
              >确认</el-button
            >
            <el-button
              type="primary"
              @click="methods.ToChangePhone()"
              v-else-if="item.id == 1"
              >确认</el-button
            >
            <el-button
              type="primary"
              @click="methods.ToChangeEmail()"
              v-else-if="item.id == 2"
              >确认</el-button
            >
            <el-button
              type="primary"
              @click="methods.ToChangePwd()"
              v-else-if="item.id == 3"
              >确认</el-button
            >
            <el-button
              type="primary"
              @click="methods.ToLoginOut()"
              v-else-if="item.id == 4"
              >确认</el-button
            >
          </div>
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
} from "vue";
import store from "@/store/index.js";
import api from "@/api/api.js";
// 在这里定义组件的响应式变量和函数
import { useRouter } from "vue-router";
const router = useRouter();
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  situation: reactive([
    {
      id: 0,
      isShow: false,
      icon: "warning",
      titp: "修改密码",
      English: "Please confirm whether to modify the password",
      oldPass: "",
      newPass: "",
    },
    {
      id: 1,
      isShow: false,
      icon: "warning",
      titp: "修改电话",
      English: "Please confirm whether to modify the phone number",
      oldPhone: store.state.userInfo?.base.mobile,
      newPhone: "",
    },
    {
      id: 2,
      isShow: false,
      icon: "warning",
      titp: "修改邮箱",
      English: "Please confirm whether to modify the email address",
      oldEmail: store.state.userInfo?.base.email,
      newEmail: "",
    },
    {
      id: 3,
      isShow: false,
      icon: "error",
      titp: "网络连接错误！！！",
      English: "Network connection error",
    },
    {
      id: 4,
      isShow: false,
      icon: "info",
      titp: "确认注销账号吗？",
      English: "Are you sure to cancel the account?",
    },
    {
      id: 5,
      isShow: false,
      icon: "error",
      titp: "旧密码错误！！！",
      English: "Old password error",
    },
    {
      id: 6,
      isShow: false,
      icon: "error",
      titp: "手机号格式错误！！！",
      English: "Mobile number format error",
    },
    {
      id: 99,
      isShow: false,
      icon: "error",
      titp: "网络连接错误！！！",
      English: "Network connection error",
    },
  ]),
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  async ToChangePwd() {
    if (state.situation[0].oldPass == state.situation[0].newPass) {
      state.situation[5].isShow = true;
    } else {
      let myResult = await api.user.renewPassword(
        state.situation[0].oldPass,
        state.situation[0].newPass
      );
      if (myResult) {
        console.log("修改成功");
        methods.ToLoginOut();
      } else {
        console.log("修改失败");
      }
    }
  },

  // 定义组件方法
  async ToChangePhone() {
    if (
      parseInt(state.situation[1].newPhone) <= 10000000000 ||
      isNaN(parseInt(state.situation[1].newPhone))
    ) {
      state.situation[6].isShow = true;
    } else {
      let myResult = await api.user.renewPhoneNum(state.situation[1].newPhone);
      if (myResult) {
        console.log("修改成功");
      } else {
        console.log("修改失败");
      }
    }
  },
  async ToChangeEmail() {
    if (false) {
      state.situation[6].isShow = true;
    } else {
      let myResult = await api.user.renewEmail(state.situation[2].newEmail);
      if (myResult) {
        console.log("修改成功");
      } else {
        console.log("修改失败");
      }
    }
  },
  ToLoginOut() {
    state.situation[4].isShow = false;
    api.common.setAuthorization("null");
    api.common.deleteCookie("myToken");
    store.commit("setUserInfo", null);
    store.commit("setCheckLogin", false);
    router.push({
      path: "/",
    });
  },
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
  console.log("AccSet挂载");
  console.log(store.state);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
#account-set {
}
.el-card {
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
}

.card-header {
  text-align-last: left;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  font-weight: 600;
  color: #2e2e2e;
  font-size: 18px;
}
:deep(.el-card__header) {
  padding: 0;
  margin: 0;
  border: none;
}
:deep(.el-card__body) {
  padding-top: 0;
  padding-left: 32px;
}
.form * {
  line-height: initial;
}
.form li {
  display: flex;
  height: 24px;
  padding-top: 32px;
  padding-bottom: 16px;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;
}
.form li:last-child {
  border-bottom: none;
}
.left,
.right {
  display: inline-block;
}
.left {
  width: 75px;
  margin-left: 16px;
  display: flex;
  justify-content: space-between;
}
.right a {
  margin-left: 32px;
  color: turquoise;
}
.inputCSS {
  display: inline-block;
}
</style>
