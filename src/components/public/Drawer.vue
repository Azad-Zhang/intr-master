<template>
  <div
    class="right-box"
    @mouseleave="methods.onMouseLeave"
    v-if="store.state.isWhoLogin == 'student'"
  >
    <!-- <button>我是右边栏目</button> -->
    <div class="right-side">
      <p
        @click="clickEvent(0)"
        :class="{ 'selected-icon': state.drawerContShow[0] }"
      >
        <span class="icon-xihuan"></span>
        <br />
        <i>喜欢</i>
      </p>
      <p
        @click="clickEvent(1)"
        :class="{ 'selected-icon': state.drawerContShow[1] }"
      >
        <span class="icon-goutong"></span>
        <br />
        <i>沟通过</i>
      </p>
      <p
        @click="clickEvent(2)"
        :class="{ 'selected-icon': state.drawerContShow[2] }"
      >
        <span class="icon-xihuan"></span>
        <br />

        <i>已投递</i>
      </p>
      <p
        @click="clickEvent(3)"
        :class="{ 'selected-icon': state.drawerContShow[3] }"
      >
        <span class="icon-mianshianpai"></span>
        <br />

        <i>面试</i>
      </p>
    </div>

    <div class="drawer" :class="{ expand: state.drawerShow }" ref="drawer">
      <div class="header" ref="headInfo"></div>
      <div class="content">
        <div v-show="state.drawerContShow[0]">
          <div
            class="cardType1"
            v-for="(item, index) in state.likePosData"
            :key="item"
          >
            <p>
              <span @click="toJob(item)">{{ item.title }}</span>
              <span>{{ item.salary }}</span>
            </p>
            <p>
              <span>{{ item.firmName }}</span>
              <span>{{ item.firmType }}</span>
            </p>
            <p>
              <span>{{ item.headImg }}</span>
              <span>{{ item.HRname }}</span>
              <span>{{ item.HRPos }}</span>
              <span @click="DeleteLike(index)">删除</span>
            </p>
          </div>
        </div>
        <div v-show="state.drawerContShow[1]">
          <!-- 沟通  等待陈公子的接口-->
          <!-- <div v-if="null == null" class="cardType1">
            <p>请登录后查看</p>
          </div>
          <div
            v-else
            class="cardType2"
            v-for="(item, key) in $store.state.WebSocket.messages"
            :key="item.num"
            @click="setChatUser(key)"
          >
            <p>
              <span class="chatname">
                {{ item.name }}
              </span>
            </p>
            <p class="clearStyle">
              <span class="message">
                {{
                  item.msgs.length < 1
                    ? ""
                    : item.msgs[item.msgs.length - 1].msg
                }}
              </span>
              <span style="font-size: 14px; color: #c85358b6">
                未读{{ item.num }}
              </span>
            </p> -->
          <!-- <p>
              <span>{{ item.title }}</span>
              <span>{{ item.posState }}</span>
            </p>
            <p>
              <span>{{ item.firmName }}</span>
              <span>{{ item.firmType }}</span>
            </p>
            <p>
              <span>{{ item.headImg }}</span>
              <span>{{ item.HRname }}</span>
              <span>{{ item.HRPos }}</span>
              <span>删除</span>
            </p> -->
          <!-- </div> -->
        </div>
        <div v-show="state.drawerContShow[2]">
          <div
            class="cardType1"
            v-for="(item, index) in state.deliveredPosData"
            :key="item"
          >
            <p>
              <span>{{ item.title }}</span>
              <span>{{ item.feedback }}</span>
            </p>
            <p>
              <span>{{ item.firmName }}</span>
              <span>{{ item.firmType }}</span>
            </p>
            <p>
              <span>{{ item.headImg }}</span>
              <span>{{ item.HRname }}</span>
              <span>{{ item.HRPos }}</span>
              <span @click="DeleteDeliv(index)">删除</span>
            </p>
          </div>
        </div>
        <div v-show="state.drawerContShow[3]">
          <div
            class="cardType1"
            v-for="(item, index) in state.interviewData"
            :key="item"
          >
            <p>
              <span @click="interview(item.id)">{{ item.title }}</span>
              <span>{{ item.interviewInfo }}</span>
            </p>
            <p>
              <span>{{ item.firmName }}</span>
              <span>{{ item.firmType }}</span>
            </p>
            <p>
              <span>{{ item.headImg }}</span>
              <span>{{ item.HRname }}</span>
              <span>{{ item.HRPos }}</span>
              <span @click="DeleteIntr(index)">删除</span>
            </p>
          </div>
        </div>
      </div>
    </div>
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
// 在这里定义组件的响应式变量和函数
import store from "@/store/index.js";
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  drawerShow: false,
  drawerContShow: [false, false, false, false],
  likePosData: [
    {
      title: "算法工程师+(十五薪)",
      salary: "10-15k",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
    {
      title: "算法工程师+(十五薪)",
      salary: "10-15k",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
    {
      title: "算法工程师+(十五薪)",
      salary: "10-15k",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
    {
      title: "算法工程师+(十五薪)",
      salary: "10-15k",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
    {
      title: "算法工程师+(十五薪)",
      salary: "10-15k",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
    {
      title: "算法工程师+(十五薪)",
      salary: "10-15k",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
  ],
  interviewData: [
    {
      id: "100",
      title: "算法工程师+(十五薪)",
      interviewInfo: "线上面试",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
    {
      id: "102",
      title: "算法工程师+(十五薪)",
      interviewInfo: "线下面试",
      firmName: "字节跳动",
      firmType: "上市公司",
      headImg: "头像",
      HRName: "HR名",
      HRPos: "HR职位",
    },
  ],
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});
const clickEvent = function (index) {
  console.log("得到的值");
  console.log(index);
  state.drawerShow = true;
  state.drawerContShow = [false, false, false, false];
  state.drawerContShow[index] = true;
};
const DeleteLike = function (index) {
  console.log("删除");

  console.log(index);
  state.likePosData.splice(index, 1);
};
const DeleteIntr = function (index) {
  console.log("删除");
  console.log(index);
  state.interviewData.splice(index, 1);
};
// 方法
const methods = {
  // 定义组件方法
  onMouseLeave() {
    state.drawerShow = false;
  },
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
.expand {
  transition: all 0.2s;
  width: 350px !important;
}

.right-side .selected-icon,
.right-side > p:hover > * {
  color: var(--el-color-primary-light-1);
  font-weight: 550;
}

.right-box {
  position: fixed;
  z-index: 20;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: var(--el-box-shadow-light);
}

.right-side {
  float: left;
  height: 100%;
  width: 60px;
  padding-top: 100px;
  background-color: white;
  /* border: 1px yellow solid; */
}

.right-side > p {
  text-align: center;
  font-size: 38px;
  line-height: 30px;
  margin-top: 20px;
  color: rgba(55, 55, 55, 0.5);
}

.right-side > p > i {
  visibility: visible;
  font-size: 18px;
}

.right-side:hover > p > i {
  visibility: visible;
}

.right-side:hover {
  transition: all 0.2s;
  width: 70px;
}

.right-side > p:hover {
  cursor: pointer;
}

.drawer {
  float: left;
  height: 100%;
  background-color: #fbfbfd;
  width: 0px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, .1); */
  z-index: 1;
}

.header {
  height: 80px;
  padding-left: 20px;
  line-height: 100px;
  margin-bottom: 1px;
  font-size: 24px;
  letter-spacing: 2px;
  color: #606266;
  /* background-color: #fff; */
}

.content {
  /* background-color: red; */
  height: 100%;
  overflow-y: scroll;
}

.content::-webkit-scrollbar {
  display: none;
}

.content > div {
  /* background-color: yellow; */
  height: 100%;
}

.content .cardType1 {
  height: 130px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
}

.cardType1:hover {
  cursor: pointer;
}

.cardType1:hover > p:first-child :first-child {
  color: var(--el-color-primary-light-1);
}

.cardType1 > p {
  display: flex;
  flex: 1;
  margin-top: 10px;
}

.cardType1 > p:first-child {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  color: #61687c;
}

.cardType1 > p:first-child :nth-child(2) {
  color: tomato;
}

.cardType1 > p:nth-child(3) :nth-child(2)::after,
.cardType1 > P:nth-child(2) :first-child::after {
  content: "|";
  margin-left: 10px;
  /* color: red; */
}

.cardType1 > P:nth-child(3),
.cardType1 > p:nth-child(2) {
  font-weight: 400;
  color: #9fa3af;
}

.cardType1 > p:last-child :last-child {
  align-self: flex-end;
  /**元素auto会默认占据最多的，此处用于定位**/
  margin-left: auto;
  margin-top: -2px;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #818387;
  transition: all 0.5s;
}
.cardType1 > p:last-child :last-child:hover {
  color: #fbfbfd;
  background-color: red;
}
.content .cardType2 {
  height: 100px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
.cardType2:hover {
  cursor: pointer;
}

.cardType2:hover > p:first-child :first-child {
  color: var(--el-color-primary-light-1);
}

.cardType2 > p {
  display: flex;
  flex: 1;
  margin-top: 10px;
}

.cardType2 > p:last-child :last-child {
  align-self: flex-end;
  /**元素auto会默认占据最多的，此处用于定位**/
  margin-left: auto;
  margin-top: -2px;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #818387;
  transition: all 0.5s;
}
.cardType2 > p:last-child :last-child::before {
  content: "  ";
}
.cardType2 .chatname {
  font-weight: bolder;
}
</style>
