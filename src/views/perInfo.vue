<template>
  <div id="person-info">
    <el-container class="w">
      <!-- 侧边栏 开始 -->
      <el-aside>
        <InfoAside
          :asideInfo="state.asideStuInfo"
          v-if="store.state.isWhoLogin == 'student'"
        ></InfoAside>
        <InfoAside :asideInfo="state.asideEntInfo" v-else></InfoAside>
      </el-aside>
      <!-- 侧边栏 结束 -->
      <!-- 内容显示 开始 -->
      <el-main>
        <!-- <div>"首页"</div> -->
        <div v-if="store.state.isWhoLogin == 'student'">
          <PriData v-if="state.asideStuInfo[0].isActive"></PriData>
          <CurrVite v-if="state.asideStuInfo[1].isActive"></CurrVite>
          <AccSet v-if="state.asideStuInfo[2].isActive"></AccSet>
          <PriSet v-if="state.asideStuInfo[3].isActive"></PriSet>
          <StuInfoAuth v-if="state.asideStuInfo[4].isActive"></StuInfoAuth>
          <MyColl v-if="state.asideStuInfo[5].isActive"></MyColl>
          <!-- <ComInfoAuth v-if="state.asideStuInfo[5].isActive"></ComInfoAuth> -->
          <History v-if="state.asideStuInfo[6].isActive"></History>
        </div>
        <div v-else>
          <ComHome v-if="state.asideEntInfo[0].isActive" />
          <PosMan v-if="state.asideEntInfo[1].isActive" />
          <ComInfoAuth v-if="state.asideEntInfo[2].isActive" />
          <RecruitData v-if="state.asideEntInfo[3].isActive" />
        </div>
      </el-main>
      <!-- 内容显示 结束 -->
    </el-container>
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
import InfoAside from "@/components/perinfo/InfoAside.vue";
import PriData from "@/components/perinfo/Student/PriData.vue";
import CurrVite from "@/components/perinfo/Student/CurrVita.vue";
import AccSet from "@/components/perinfo/Student/AccSet.vue";
import PriSet from "@/components/perinfo/Student/PriSet.vue";
import StuInfoAuth from "@/components/perinfo/Student/InfoAuth.vue";
import MyColl from "@/components/perinfo/Student/MyColl.vue";
import History from "@/components/perinfo/Student/History.vue";
import ComHome from "@/components/perinfo/Company/ComHome.vue";
import PosMan from "@/components/perinfo/Company/PosMan.vue";
import ComInfoAuth from "@/components/perinfo/Company/InfoAuth.vue";
import RecruitData from "@/components/perinfo/Company/RecruitData.vue";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  asideStuInfo: reactive([
    {
      title: "个人资料",
      index: 1,
      isActive: true,
    },
    {
      title: "个人简历",
      index: 2,
      isActive: false,
    },
    {
      title: "账号设置",
      index: 3,
      isActive: false,
    },
    {
      title: "隐私设置",
      index: 4,
      isActive: false,
    },
    {
      title: "信息认证",
      index: 5,
      isActive: false,
    },
    //   { title: "职业生涯", inex: 5, isActive: false },
    {
      title: "我的收藏",
      index: 6,
      isActive: false,
    },
    {
      title: "浏览历史",
      index: 7,
      isActive: false,
    },
  ]),
  asideEntInfo: reactive([
    {
      title: "公司主页",
      index: 1,
      isActive: true,
    },
    {
      title: "职位管理",
      index: 2,
      isActive: false,
    },
    {
      title: "信息认证",
      index: 3,
      isActive: false,
    },
    {
      title: "招聘数据",
      index: 4,
      isActive: false,
    },
  ]),
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  test() {
    // console.log(store.state.userInfo);
  },
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
  //   console.log("store.state.userInfo");
  //   console.log(store.state.userInfo);
  //   console.log("当前是谁在登录？");
  //   console.log(store.state.isWhoLogin);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
#person-info {
  background-color: rgb(245, 246, 247);
  padding-top: 10px;
}
.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 200px;
  margin-right: 10px;
}
</style>
