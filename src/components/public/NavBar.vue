<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="5" id="school-icon" v-if="store.state.isLoggedIn">
      <router-link to="/">
        <div id="school-image">
          <el-image
            :src="headImgSrc"
            :fit="fits[0]"
            @click="toIndex"
            style="cursor: pointer"
          ></el-image></div
      ></router-link>
    </el-menu-item>

    <el-menu-item index="0" v-if="store.state.isLoggedIn == false">
      <router-link to="/">首页</router-link>
    </el-menu-item>
    <el-menu-item index="1" v-if="store.state.isLoggedIn == false"
      ><router-link to="/recruit">人才市场</router-link></el-menu-item
    >
    <!-- <el-menu-item index="2" v-if="store.state.isLoggedIn == false"
      >兼职</el-menu-item
    > -->
    <div class="flex-grow" />
    <el-menu-item
      index="3"
      v-if="store.state.isLoggedIn == false"
      @click="state.noticeShow = true"
    >
      <div>
        <el-badge :value="state.noticeLength" id="notice-band">
          <el-button id="notice">消息通知</el-button>
        </el-badge>
      </div>
    </el-menu-item>
    <el-sub-menu
      index="4"
      v-if="store.state.isLoggedIn == false && store.state.checkLogin == true"
    >
      <template #title>
        <!-- <el-avatar> user </el-avatar> -->
        <el-avatar
          :src="'/api' + store.state.userInfo.base?.avatar"
          v-if="store.state.checkLogin == true"
        ></el-avatar>
      </template>

      <!-- <el-menu-item index="4" v-if="this.$store.state.isLoggedIn == false"> -->
      <!-- </el-menu-item> -->
      <el-menu-item index="2-1" @click="goToPerInfo">个人主页</el-menu-item>
      <el-menu-item index="2-2" @click="methods.logOut">退出登录</el-menu-item>
      <!-- <el-menu-item index="2-3">item three</el-menu-item> -->
    </el-sub-menu>
    <el-menu-item
      index="4"
      v-if="store.state.isLoggedIn == false && store.state.checkLogin == false"
    >
      <router-link to="/LogOn">登录</router-link>
    </el-menu-item>

    <!-- <el-sub-menu index="5">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item> -->
    <!-- <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    <!-- </el-sub-menu> -->
  </el-menu>
  <el-dialog v-model="state.noticeShow" title="通知消息" width="30%" center>
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item
          v-for="(item, index) in state.notice"
          :key="index"
          :name="index"
        >
          <template #title>
            <span class="title">{{ item.title }}</span>
            <span class="data">
              发布日期： {{ new String(item.CreatedAt).split("T")[0] }}
            </span>
            <!-- <el-icon @click="methods.DeleteID(item.ID)" @click.stop.native
              ><Close
            /></el-icon> -->
          </template>
          <div>
            {{ item.content }}
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item title="Consistency" name="1">
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Efficiency" name="3">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which
            helps the users to identify and frees them from memorizing and
            recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Controllability" name="4">
          <div>
            Decision making: giving advices about operations is acceptable, but
            do not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item> -->
      </el-collapse>
    </div>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, onUpdated, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api.js";
import store from "@/store/index.js";
const router = useRouter();
const activeIndex = "0";
const headImgSrc = "https://csxrz.cqnu.edu.cn/cas/cs/img/logored.png";
const fits = ["fill", "contain", "cover", "none", "scale-down"];
const avatar = "1";

const methods = {
  handleSelect(key, keyPath) {
    console.log(key, keyPath);
  },
  logOut() {
    api.common.setAuthorization("null");
    api.common.deleteCookie("myToken");
    store.commit("setUserInfo", null);
    store.commit("setCheckLogin", false);
    store.commit("setWhoLogin", "null");

    router.push({
      path: "/",
    });
  },
};
// 响应式变量
const state = reactive({
  // 定义响应式变量
  notice: [],
  noticeLength: 0,
  noticeShow: false,
  activeNames: [1],
});
const goToPerInfo = () => {
  router.push("/PerInfo");
};

// 生命周期钩子
// 在 <script setup> 中，Vue 3 使用 `<onMounted>`, `<onUpdated>`, `<onUnmounted>` 代替传统的生命周期钩子
// 例如，在 mounted 钩子内部的逻辑可以放在 onMounted 钩子内部
onMounted(() => {
  /* 被正常挂载的时候 */
  setTimeout(async () => {
    const myResult = await api.common.getAllNotice();
    // console.log("得到的通知");
    // console.log(myResult);
    // console.log("用户是否登录");
    // console.log(store.state.checkLogin);
    const isLogin = store.state.checkLogin;
    if (isLogin) {
      const who = store.state.isWhoLogin;
      let sOrC = 0;
      if (who == "student") {
        // console.log("学生登录");

        sOrC = 0;
      } else {
        // console.log("企业登录");
        sOrC = 1;
      }
      for (let i = 0; i < myResult.length; i++) {
        if (myResult[i].target == sOrC) {
          state.notice.push(myResult[i]);
        }
      }
      state.noticeLength = state.notice.length;
      //   console.log("看看最后的数据");
      //   console.log(state.notice);
      //   console.log(state.noticeLength);
    } else {
      console.log("未登录");
    }
  }, 1000);
});

onUpdated(() => {
  /* 更新的时候 */
});

onUnmounted(() => {
  /* 对应 Vue 2 的 destroyed 被销毁的时候 */
});
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
/* .el-image {
  display: inline-block;
  height: 100px;
  line-height: 100px;
}*/

#school-icon {
  display: flex;
  flex: 1; /* 让元素占满剩余的空间 */
  justify-content: flex-start; /* 元素向左扩展 */
  align-items: center;
  height: 100%;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: var(--el-menu-text-color);
}
#school-icon:hover {
  background-color: transparent;
}

#school-image .el-image__inner {
  width: 100%;
  height: 100%;
}
#school-image .el-image {
  width: 100%;
  height: 100%;
}
#school-image .el-image:hover {
  transition: none; /* 移除过渡效果 */
  transform: none; /* 移除缩放效果 */
}

:deep(.el-badge__content.is-fixed) {
  position: absolute;
  top: 12px;
  right: calc(1px + var(--el-badge-size) / 2);
  transform: translateY(-50%) translateX(100%);
  z-index: var(--el-index-normal);
}
#notice {
  vertical-align: middle;
}
.title {
  width: 30%;
  text-align: left;
}
.data {
  width: 50%;
  text-align: center;
}
</style>
