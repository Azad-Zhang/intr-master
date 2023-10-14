<template>
  <div class="showbar">
    <div class="show-item" v-for="item in forDatas" :key="item.title">
      <b>{{ item.title }}</b>
      <a href="javascript:void(0);" v-for="data in item.datas" :key="data">
        {{ data }}</a
      >
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
let forDatas = [
  {
    title: "技术",
    datas: ["Java", "PHP", "Python", "算法", "数据库设计", "计算机维护"],
  },
  { title: "产品", datas: ["产品经理", "产品总监", "数据产品经理"] },
  { title: "设计", datas: ["UI设计师", "平面设计", "交互设计", "动画设计"] },
  { title: "运营", datas: ["新媒体运营", "产品运营", "网络推广"] },
  { title: "市场", datas: ["市场营销", "市场推广", "品牌公关", "策划经理"] },
  { title: "传媒", datas: ["广告文案", "广告创建设计", "编辑", "记者"] },
  { title: "金融", datas: ["投资经理", "投资总监", "风控", "市场分析师"] },
];
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
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
.showbar {
  width: 100%;
  height: 350px;
  margin: auto;
  padding-bottom: 50px;
  overflow-y: scroll;
  box-shadow: var(--el-box-shadow-lighter);
  background: white;
}
.showbar::-webkit-scrollbar {
  display: none;
}
.showbar .show-item {
  /* margin-bottom: 10px; */
  padding: 18px;
  line-height: 28px;
  font-size: 18px;
  text-align: left;
}
.showbar b {
  font-size: 22px;
}
.showbar .show-item:hover {
  background-color: #409eff;
}
.showbar .show-item:hover > * {
  color: var(--el-color-primary-light-9);
}
.showbar a {
  padding-left: 30px;
}
</style>
