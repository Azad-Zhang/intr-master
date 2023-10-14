<template>
  <div id="company-intro">
    <Editor :Choice="state.myChoice"></Editor>
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
import Editor from "@/components/public/Editor.vue";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量;
const state = reactive({
  // 定义响应式变量
  myChoice: 1,
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
#company-intro {
  position: relative;
}
.el-input {
  width: 50%;
}
:deep(.el-textarea__inner) {
  width: 70%;

  font-size: 20px;
}
:deep(.el-textarea .el-input__count) {
  right: 31%;
}
.el-button {
  position: absolute;
  bottom: 0;
  right: 10%;
  width: 100px;
  height: 40px;
}
</style>
