<template>
  <div class="recruit-box">
    <div class="recruit-cont w15">
      <Search></Search>
      <ShowBar></ShowBar>
      <h1>————热门职业————</h1>
      <div class="position">
        <div class="pos-bar" @click="selectClickEnvent">
          <div>IT·互联网</div>
          <div>金融</div>
          <div>房地产·建筑</div>
          <div>教育培训</div>
          <div>娱乐传媒</div>
          <div>医疗健康</div>
          <div>法律咨询</div>
          <div>供应链·物流</div>
        </div>
        <div class="pos-cont">
          <PosCard
            v-for="item in state.posArrays"
            :key="item.pid"
            :fData="item"
          ></PosCard>
        </div>
        <!-- <el-skeleton :rows="20"  /> -->
      </div>
      <h1>————热门企业————</h1>
      <div class="enterprise">
        <EnterPrise
          v-for="(item, index) in TestComInfo"
          :key="index"
          :fData="item"
        ></EnterPrise>
      </div>
      <!-- <el-skeleton :rows="20"  /> -->
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
import api from "@/api/api.js";

import Search from "@/components/recruit/Search.vue";
import ShowBar from "@/components/recruit/ShowBar.vue";
import PosCard from "@/components/recruit/PosCard.vue";
import EnterPrise from "@/components/recruit/EnterPrise.vue";

// 在这里定义组件的响应式变量和函数

const selectClickEnvent = function () {
  console.log("点击");
};

// props
const props = defineProps({
  // 定义props
});

let TestComInfo = ref([
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
  {
    cid: 17,
    name: "电子商务公司",
    avatar: "",
    desc: "没得啥子说的",
    area: "中国-重庆",
    product: "暂时没啥子做的",
    video: "等等吧,这是一个url",
    status: 0,
    size: "10-50人",
    sector: "计算机",
    financing: "200万",
    treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
  },
]);
// 响应式变量
const state = reactive({
  // 定义响应式变量
  posArrays: [
    {
      cid: 17,
      name: "牛子公司",
      avatar: "/api/up/img/4x1t9217QQ图片20230502225447.jpg",
      desc: "没得啥子说的",
      area: "中国-重庆",
      product: "暂时没啥子做的",
      video: "等等吧,这是一个url",
      status: 0,
      size: "10-50人",
      sector: "计算机",
      financing: "200万",
      treatment: "09:00-17:00-偶尔加班-双班-补充医疗保险-零食下午茶",
    },
  ],
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
};

// 生命周期钩子
onMounted(async () => {
  // 组件被挂载时执行的逻辑

  setTimeout(async () => {
    const myPositions = await api.common.getAllPositions();
    state.posArrays = [];
    if (myPositions.length > 9) {
      for (let i = 0; i < 9; i++) {
        state.posArrays.push(myPositions[i]);
      }
    }

    const myCompanys = await api.common.getAllPositions();
    console.log("当前posArrays");
    console.log(state.posArrays);
  }, 1000);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
.recruit-box {
  padding-top: 20px;
  background-color: #f6f6f8;
}

.recruit-cont {
  height: 100%;
  /* border: 1px solid black; */
}

h1 {
  font-size: 38px;
  margin: 50px 0 50px 0;
  text-align: center;
}

.position {
  /* height: 650px; */
  margin-top: 50px;
  /* border: 1px solid black; */
  /* background-color: black; */
}

.pos-bar {
  display: flex;
  height: 100px;
  padding-left: 20px;
  background-color: #fff;
}

.pos-bar > div {
  float: left;
  height: 100px;
  /* padding-right: 50px; */
  margin-right: 50px;
  line-height: 100px;
  font-size: 24px;
  color: #909399;
}

.pos-bar > div:hover {
  cursor: pointer;
  border-bottom: 5px solid var(--el-color-primary);
}

.selected-item {
  color: #409eff !important;
  font-weight: bold;
  border-bottom: 5px solid var(--el-color-primary);
}

.pos-cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
}
.enterprise {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
